"use client";

import { CopyIcon, Loader2, Share2 } from "lucide-react";
import { useState } from "react";
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
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { WhatsAppLogoIcon } from "./WhatsAppLogoIcon";

export default function Share({ postLink: postSlug }: { postLink: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://everynyan.vercel.app";
  const postURL = `${baseURL}/post/${postSlug}`;

  const handleClick = async () => {
    setIsCopied(true);

    try {
      await navigator.clipboard.writeText(postURL);
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
        <div className="w-max h-max p-1 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
          {isCopied ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Share2 className="size-4 text-primary" />
          )}
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
            <Input value={postURL} readOnly className="w-full" />
          </div>
          <div className="w-full flex justify-center flex-wrap items-center gap-4">
            <Button type="button" variant="default" onClick={handleClick}>
              <CopyIcon className="size-4" />
            </Button>
            <Link
              href={`https://x.com/intent/post?text=${encodeURIComponent(
                `Take a look at this post on EveryNyan: ${postURL}`
              )}`}
              target="_blank"
            >
              <Button type="button" variant="outline">
                <TwitterLogoIcon className="size-4" />
              </Button>
            </Link>
            <Link
              href={`https://api.whatsapp.com/send/?text=${encodeURIComponent(
                `Take a look at this post on EveryNyan: ${postURL}`
              )}`}
              target="_blank"
            >
              <Button type="button" variant="outline">
                <WhatsAppLogoIcon className="size-4 fill-white" />
              </Button>
            </Link>
            {/* <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
