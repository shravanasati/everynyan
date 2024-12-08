import "@/app/scrollbar.css";
import PerPost from "@/components/Posts/PostView/PerPost";
import { Suspense } from "react";
import Loading from "@/app/loading";
import CommentsWrapper from "../CommentsWrapper";

async function PostView({
  postID,
}: {
  postID: string;
}) {

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6 everynyan-scroll">
          <PerPost postID={postID}/>
          <Suspense fallback={<Loading />}>
            <CommentsWrapper postID={postID} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default PostView;
