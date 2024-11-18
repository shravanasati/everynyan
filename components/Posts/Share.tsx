"use client";

import { Loader2, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
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

export default function Share({ postLink }: { postLink?: string }) {
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
        <div className="h-8 w-full sm:w-auto px-4 sm:px-2 py-4 rounded-full flex gap-1 justify-center items-center bg-primary/20 cursor-pointer hover:bg-primary/30 transition-colors">
          {isCopied ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Share2 size={20} />
          )}
          <span className="sm:hidden">Share</span>
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
            <Input value={postUrl} readOnly className="w-full" />
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
