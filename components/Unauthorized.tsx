import Link from 'next/link'
import Image from "next/image"

import { Button } from '@/components/ui/button'

export function NotAuthorized() {
  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-background">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <Image className="mx-auto text-muted-foreground" src="/frown.png" width={128} height={128} alt='sad' />
          <h1 className="text-4xl font-bold tracking-tighter">403 - Not Authorized</h1>
          <p className="text-muted-foreground">Sorry, you don&apos;t have permission to access this page.</p>
        </div>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/">Go back home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Not Authorized',
  description: 'You do not have permission to access this page',
}