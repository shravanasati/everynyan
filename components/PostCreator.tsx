'use client'

import dynamic from "next/dynamic";
import { Suspense, useRef, useState } from "react";
import AnimatedLoader from "@/components/AnimatedLoader";
import { boardList } from "@/lib/boards";
const EditorComp = dynamic(() => import("@/components/MdEditor"), {
  ssr: false,
});


export function PostCreator() {
  const [markdown, setMarkdown] = useState("*hello* **world**. type away your post, in <u>markdown</u>.");
  const boardRef = useRef<HTMLSelectElement>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="m-4 p-2 font-bold text-4xl">
        Create a post
      </h1>

      <br />
      <div className="flex flex-row items-center">
        <p>Choose a board:</p>
        <select className="m-4 p-2 rounded-xl text-black text-center" ref={boardRef}>
          {boardList.map((boardName: string) => (
            <option key={boardName} value={boardName}>
              {boardName}
            </option>
          ))}
        </select>
      </div>

      <div className="w-[calc(100vw-4rem)] m-2 p-2">
        <Suspense fallback={<AnimatedLoader />}>
          <EditorComp markdown={markdown} onChange={setMarkdown} />
        </Suspense>
      </div>

      <button
        className="m-4 p-2 bg-blue-500 text-white rounded-md"
        disabled={loading}
        onClick={() => {
          try {
            setLoading(true);
            // todo send markdown to server
            console.log(boardRef.current?.value);
            console.log(markdown);
          } catch (e) {
            console.error(e);
          } finally {
            setLoading(false);
          }
        }}
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
}