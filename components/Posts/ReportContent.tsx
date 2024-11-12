"use client";

import { Loader2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { reportPost, reportComment } from "@/lib/actions/report";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ReportContentProps = {
  postID?: string;
  commentID?: string;
};

export default function ReportContent({
  postID,
  commentID,
}: ReportContentProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState<string | null>(null);
  const { toast } = useToast();

  const handleReportContent = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!selectedFlag) {
      toast({
        title: "Please select a reason",
        description: "You must select a reason for reporting this content.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      let resp;
      if (postID) {
        resp = await reportPost(postID, selectedFlag);
      } else if (commentID) {
        resp = await reportComment(commentID, selectedFlag);
      } else {
        throw new Error("either postID or commentID is required");
      }

      if (!resp.success) {
        throw new Error(resp.message);
      }

      toast({
        description: "Content reported successfully!",
        variant: "default",
      });
      setOpen(false);
    } catch (e) {
      console.error("unable to report content", e);
      toast({
        title: "Can't report this content!",
        description: e instanceof Error ? e.message : String(e),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const reportReasons = [
    {
      value: "inappropriate",
      label: "Inappropriate",
      description:
        "Content that violates community guidelines or is offensive.",
    },
    {
      value: "violent",
      label: "Violent or Repulsive",
      description:
        "Content containing extreme violence, gore, or disturbing material.",
    },
    {
      value: "spam",
      label: "Spam or Misleading",
      description: "Repetitive, unwanted, or deceptive content.",
    },
    {
      value: "other",
      label: "Other",
      description: "Any other reason not covered by the above categories.",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="h-8 w-[14.5rem] md:w-16 px-2 py-4 rounded-full flex gap-1 justify-center items-center bg-primary/20 cursor-pointer text-red-600 hover:bg-primary/30 transition-colors">
          {loading ? (
            <Loader2 className="h-4 w-5 text-primary animate-spin cursor-not-allowed" />
          ) : (
            <>
              <TriangleAlert className="h-4 w-5" />
              <span className="md:hidden">Report</span>
            </>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#090909] w-[95vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Report Content</DialogTitle>
          <DialogDescription>
            Please select an appropriate reason.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleReportContent} className="space-y-6">
          <RadioGroup
            value={selectedFlag || ""}
            onValueChange={setSelectedFlag}
            className="space-y-3 text-base sm:text-lg"
          >
            {reportReasons.map((reason) => (
              <div key={reason.value} className="flex items-center space-x-2">
                <RadioGroupItem value={reason.value} id={reason.value} />
                <Label htmlFor={reason.value} className="flex items-center">
                  {reason.label}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="bg-primary/10 rounded-full px-2 py-1 ml-2">
                        ?
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{reason.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="bg-primary/20 text-primary w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground w-full sm:w-auto"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Submit Report"
              )}
            </Button>
          </div>
        </form>
        <p className="text-xs sm:text-sm mt-4 text-muted-foreground">
          In case of emergency contact us on &nbsp;
          <Link
            href="https://instagram.com/everynyan.support"
            className="text-primary/45 hover:underline"
          >
            Instagram
          </Link>
          . <br className="sm:hidden" /> Be sure to submit your issue with the
          Post Link otherwise it will be discarded.
        </p>
      </DialogContent>
    </Dialog>
  );
}
