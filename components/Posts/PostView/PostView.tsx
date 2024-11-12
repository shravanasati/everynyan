// import { Card } from "@/components/ui/card"
import "@/app/scrollbar.css";
import PerPost from "@/components/Posts/PostView/PerPost";
import { getPostByID } from "@/lib/firebase/posts";
import { notFound } from "next/navigation";

async function PostView({ postID, isAdmin }: { postID: string, isAdmin: boolean }) {
  const post = await getPostByID(postID)
  if (!post || post.moderation_status == "rejected" && !isAdmin) {
    return notFound()
  }
  return (
    <main className="min-h-[92vh] grid grid-cols-1 md:grid-cols-5 grid-rows-1 gap-2">
      {/* !!right sidebar */}
      {/* <div className="bg-red-400 md:block hidden">left sidebar</div> */}
      {/* !!right sidebar */}

      {/* post and comment components */}
      <div className="md:col-span-5">
        <div className="grid grid-cols-1 grid-rows-6 md:grid-rows-5 gap-2 h-full px-1 md:px-4">
          {/* #post */}
          <div className="row-span-3 md:row-span-2 md:p-0 px-2 py-3">
            <PerPost boardName={post.board} content={post.body} title={post.title} upVotes={post.upvotes} downVotes={post.downvotes} id={post.id} />
          </div>
          {/* #post */}

          {/* #comment */}
          <div className="row-span-3 row-start-4 md:row-start-3 bg-green-400 everynyan-scroll">
            comments
          </div>
          {/* #comment */}
        </div>
      </div>
      {/* post and comment components */}
      {/* !!left sidebar */}
      {/* <div className="bg-blue-400 md:col-start-5 md:block hidden">
        right sidebar
      </div> */}
      {/* !!left sidebar */}
    </main>
  );
}

export default PostView;
