"use client";

import { Loader2, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Share({ postLink }: { postLink: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [postUrl, setPostUrl] = useState("");
  const { toast } = useToast();
  useEffect(() => {
    setPostUrl(`${window.location.origin}/post/${postLink}`);
  }, [postLink]);

  const handleClick = async () => {
    setIsCopied(true);
    const toClipboard = `${window.location.origin}/post/${postLink}`;

    try {
      await navigator.clipboard.writeText(toClipboard);
      toast({ description: "Copied!🍝" });
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast({
        description: "Unable to Copy link😥",
        variant: "destructive",
      });
    }
    setIsCopied(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "h-6 w-[14.5rem] md:w-16 px-2 py-4 rounded-2xl flex gap-1 justify-center items-center bg-primary/20"
          )}
          onClick={() => setIsOpen(true)}
          aria-disabled={isCopied}
        >
          {!isCopied ? (
            <Share2 className="size-6 text-primary-600" />
          ) : (
            <Loader2 className="size-6 text-primary animate-spin" />
          )}{" "}
          <span className="md:hidden inline ml-3">
            {isCopied ? "Wait" : "Share"}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#090909] w-[95vw] max-w-md mx-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            There You Go!
          </DialogTitle>
        </DialogHeader>
        <div className="w-full py-6 flex flex-col justify-center items-center gap-6">
          <div className="w-full max-w-sm overflow-hidden">
            <Input value={postUrl} readOnly className="w-full"/>
          </div>
          <div className="w-full flex justify-center flex-wrap items-center gap-4">
            <Button type="button" variant="default" onClick={handleClick}>
              Copy
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
