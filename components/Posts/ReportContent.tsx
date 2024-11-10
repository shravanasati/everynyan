"use client"
import { Loader2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { reportPost, reportComment } from "@/lib/actions/report";
import { useToast } from "@/hooks/use-toast";

type ReportContentProps = {
  postID?: string;
  commentID?: string;
}

function ReportContent({ postID, commentID }: ReportContentProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleReportContent = async () => {
    try {
      setLoading(true);
      let resp;
      if (postID) {
        resp = await reportPost(postID, "inappropriate");
      } else if (commentID) {
        resp = await reportComment(commentID, "inappropriate");
      } else {
        console.error("either postID or commentID is required");
        toast({ title: "Can't report this content!", description: "either postID or commentID is required", variant: "destructive" });
        return;
      }

      if (!resp.success) {
        toast({ title: "Can't report this content!", description: resp.message, variant: "destructive" });
        console.error("unable to report post", resp.message);
        return;
      }

      toast({ description: "Content reported successfully!", variant: "default" });

    } catch (e) {
      console.error("unable to report post", e)
      toast({ title: "Can't report this content!", description: String(e), variant: "destructive" });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-6 w-[14.5rem] md:w-16 px-2 py-4 rounded-2xl flex gap-1 justify-center items-center bg-primary/20 cursor-pointer text-red-600"
      onClick={handleReportContent}
    >
      {loading && <Loader2 className="size-6 text-primary animate-spin" />}
      {!loading && (
        <>
          <TriangleAlert className="size-6" />
          <span className="h-full flex justify-center items-center text-base md:hidden">
            Report
          </span>
        </>
      )}
    </div>
  );
}

export default ReportContent;
