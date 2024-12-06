'use client'

import { useWebSocket } from '@/hooks/useWebsocket';

import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

function ViewNotification({ link }: { link: string }) {
  return (
    <Link href={link} target="_blank" >
      <Button variant="outline" size="sm" className="gap-1" > View < ExternalLink className="size-5" /> </Button>
    </Link>
  )
}

export function RealtimeNotifications() {
  const url = `${process.env.NEXT_PUBLIC_NOTIFICATIONS_SERVER_ADDRESS}/subscribe`
  const { isConnected } = useWebSocket(url, ViewNotification);

  return (
    <div className='hidden'>
      {isConnected ? 'Connected to notifications' : 'Connecting...'}
    </div>
  );
}

