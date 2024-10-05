'use client'

import dynamic from "next/dynamic";
import { Suspense, useRef, useState } from "react";
import AnimatedLoader from "@/components/AnimatedLoader";
import { boardList } from "@/lib/boards";
import { createPost } from "@/lib/actions/createPost";
import { Input } from "@/components/ui/input";
import * as z from "zod"

const EditorComp = dynamic(() => import("@/components/MdEditor"), {
  ssr: false,
});
      
const formSchema = z.object({
  board: z.string().refine(val => boardList.includes(val), {
    message: "Invalid board"
  }),
  title: z.string().min(1, "Title cannot be empty").max(100, "Title is too long. It must be within 100 characters"),
  content: z.string().min(1, "Post cannot be empty").max(4000, "Post is too long. It must be within 4000 characters"),
})

export function PostCreator() {
  const [markdown, setMarkdown] = useState("*hello* **world**. type away your post, in <u>markdown</u>.");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const boardRef = useRef<HTMLSelectElement>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="m-4 p-2 font-bold text-4xl">
        Create a post
      </h1>

      {/* dropdown for board */}
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

      {/* title input */}
      <div className="w-full max-w-md">
        <Input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />
      </div>

      {/* markdown editor */}
      <div className="w-[calc(100vw-4rem)] m-2 p-2">
        <Suspense fallback={<AnimatedLoader />}>
          <EditorComp markdown={markdown} onChange={setMarkdown} />
        </Suspense>
      </div>

      {/* error */}
      {error && (
        <div className="w-[calc(100vw-4rem)] p-4 mb-4 mx-4 text-red-700 bg-red-100 rounded-md">
          Error: {error}
        </div>
      )}

      {/* publish button */}  
      <button
        className="m-4 p-2 bg-blue-500 text-white rounded-md"
        disabled={loading}
        onClick={async () => {
          try {
            setLoading(true);
            const selectedBoard = boardRef.current?.value;
            const result = formSchema.safeParse({ board: selectedBoard, title, content: markdown });
            if (!result.success) {
              setError(Object.values(result.error.flatten().fieldErrors).join(", "));
              return;
            }
            setError("");

            const obj = { board: result.data?.board, title: result.data?.title, content: result.data?.content };
            console.log(obj);
            const resp = await createPost(obj)
            console.log(resp)
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