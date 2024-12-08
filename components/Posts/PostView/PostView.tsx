import "@/app/scrollbar.css";
import PerPost from "@/components/Posts/PostView/PerPost";
import { Suspense } from "react";
import CommentsWrapper from "../CommentsWrapper";
import { LoadingComments } from "@/components/LoadingComments";

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
          <Suspense fallback={<LoadingComments />}>
            <CommentsWrapper postID={postID} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default PostView;
