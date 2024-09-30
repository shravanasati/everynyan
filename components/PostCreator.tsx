'use client'

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import AnimatedLoader from "@/components/AnimatedLoader";
const EditorComp = dynamic(() => import("@/components/MdEditor"), {
  ssr: false,
});


export function PostCreator() {
  const [markdown, setMarkdown] = useState("*hello* **world**. type away your post, in markdown.");

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="m-4 p-2 font-bold text-4xl">
        Create a post
      </h1>

      <br />
      <div className="w-[calc(100vw-4rem)] m-2 p-2">
        <Suspense fallback={<AnimatedLoader />}>
          <EditorComp markdown={markdown} onChange={setMarkdown} />
        </Suspense>
      </div>

      <button
        className="m-4 p-2 bg-blue-500 text-white rounded-md"
        onClick={() => {
          // todo send markdown to server
          console.log(markdown);
        }}
      >
        Publish
      </button>
    </div>
  );
}