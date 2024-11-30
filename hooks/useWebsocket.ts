import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from './use-toast';

export type NotificationType = {
  title: string;
  description: string;
};

export function useWebSocket(url: string) {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const { toast } = useToast()

  const connect = useCallback(() => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      console.log("Connected to the notifications server")
      setIsConnected(true);
      window.addEventListener("beforeunload", () => {
        wsRef.current?.close();
      })
    };

    wsRef.current.onclose = (event) => {
      console.log("Disconnected from the notifications server:", event.reason)
      setIsConnected(false);
    };

    wsRef.current.onmessage = (event) => {
      try {
        const data: NotificationType = JSON.parse(event.data)
        console.log("Receieved notification:", data)
        toast({ title: data.title, description: data.description })
      }
      catch (e) {
        console.error("Error parsing JSON data", e)
      }
    };

  }, [url])

  useEffect(() => {
    connect()

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return { isConnected };
}

