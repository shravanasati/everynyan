// import { Card } from "@/components/ui/card"
import "@/app/scrollbar.css";
import { PostData } from "@/lib/utils";

function PostView({
  title,
  content,
  board,
  upVotes,
  downVotes,
  noOfComments,
}: PostData) {
  return (
    <main className="min-h-[92vh] grid grid-cols-1 md:grid-cols-5 grid-rows-1 gap-2">
      <div className="bg-red-400 md:block hidden">right sidebar</div>
      <div className="everynyan-scroll md:col-span-3">
        
      </div>
      <div className="bg-blue-400 md:col-start-5 md:block hidden">left sidebar</div>
    </main>
  );
}

export default PostView;
