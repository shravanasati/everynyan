"use client";

import { useToast } from "@/hooks/use-toast";
import { useNotification } from "@/hooks/useNotification";
import { Button } from "./ui/button";
import { useEffect } from "react";

export function AskNotificationPerm() {
  const { isDenied, isGranted, isSubscribed, isSupported, handleSubscribe } =
    useNotification();
  const { toast } = useToast();

  useEffect(() => {
    if (!isSupported || isSubscribed || isGranted || isDenied) {
      return;
    }
    const alreadyAsked = sessionStorage.getItem("alreadyAsked");
    if (alreadyAsked) {
      return;
    }

    toast({
      title: "Notification Permission",
      description:
        "Be in-the-loop with our latest updates by enabling notifications.",
      action: (
        <Button
          variant="outline"
          size="sm"
          className="gap-1 border border-primary/90 hover:bg-primary/80 hover:text-black"
          onClick={handleSubscribe}
        >
          {" "}
          Subscribe{" "}
        </Button>
      ),
    });
    sessionStorage.setItem("alreadyAsked", "true");
  }, [isSupported, isSubscribed, isGranted, isDenied, handleSubscribe, toast]);

  return (
    <div className="hidden">
      Current Status: {isDenied ? "Denied" : isGranted ? "Granted" : "Unknown"}
    </div>
  );
}
