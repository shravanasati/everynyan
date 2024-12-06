import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from './use-toast';

export type NotificationType = {
  title: string;
  description: string;
  link: string,
};

export function useWebSocket(url: string, actionComponent: ({ link }: { link: string }) => JSX.Element) {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const { toast } = useToast()
  const heartbeat = useRef<NodeJS.Timeout>()

  const connect = useCallback(() => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      console.log("Connected to the notifications server")
      setIsConnected(true);
      window.addEventListener("beforeunload", () => {
        wsRef.current?.close();
      })

      heartbeat.current = setInterval(() => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send("__ping__")
        }
      }, 20000)
    };

    wsRef.current.onclose = (event) => {
      console.log("Disconnected from the notifications server:", event.reason)
      setIsConnected(false);
      if (heartbeat.current) {
        clearInterval(heartbeat.current)
      }
      setTimeout(connect, 2000) // reconnect after 2s
    };

    wsRef.current.onmessage = (event) => {
      try {
        if (event.data == "__pong__") {
          console.log("heartbeat received")
          return
        }
        const data: NotificationType = JSON.parse(event.data)
        console.log("Receieved notification:", data)
        toast({
          title: data.title,
          description: data.description,
          action: actionComponent({ link: data.link }),
        })
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

