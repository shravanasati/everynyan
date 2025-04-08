"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function Sunset() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="sticky top-0 z-[999999] flex h-14 w-full items-center justify-center gap-2 bg-secondary/80 text-foreground backdrop-blur">
      <span>On 8th April 2025, we are sunsetting EveryNyan.</span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className="h-auto p-0 text-primary">
            Know more
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-black">
          <DialogHeader>
            <DialogTitle>It has come to an end.</DialogTitle>
            <DialogDescription>
              Important announcement about the platform getting sunset.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-muted-foreground">
              After careful consideration, we have decided to sunset the
              EveryNyan developement on April 8th, 2025. We want to thank all
              our users for their support over the time. We are grateful for the
              community that has formed around our platform and building this
              paltform has been an amazing experience for us. We are proud of
              what we have accomplished together, and we will always cherish the
              memories we have created.
            </p>
            <p className="text-sm text-muted-foreground">
              You can continue to post and view all existing content - nothing
              will be deleted. However, please note:
              <br />
              • No new features or updates will be added
              <br />
              • Technical support will no longer be available
              <br />
              • Content moderation may be slower than usual
              <br />
              • The notification service has been discontinued
              <br />
              <br />
              The platform will remain accessible as a read/write archive.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Sunset;
