"use client"
import { TriangleAlert } from "lucide-react";

function ReportContent() {
  const reportContent = () => {
    alert("sata andagi")
    //TODO: add report by post/comment id logic here
  };
  return (
    <div
      className="h-6 w-[14.5rem] md:w-16 px-2 py-4 rounded-2xl flex gap-1 justify-center items-center bg-primary/20 cursor-pointer text-red-600"
      onClick={reportContent}
    >
      <TriangleAlert  className="size-6" />
      <span className="h-full flex justify-center items-center text-base md:hidden">
        Report
      </span>
    </div>
  );
}

export default ReportContent;
