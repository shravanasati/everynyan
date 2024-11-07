"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import AnimatedLoader from "@/components/AnimatedLoader";
import { boardList } from "@/lib/boards";
import { createPost } from "@/lib/actions/createPost";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as z from "zod";
import { useRouter } from "next/navigation";

const EditorComp = dynamic(() => import("@/components/MdEditor"), {
  ssr: false,
});

const boards = boardList.map((board) => board.title);

const formSchema = z.object({
  board: z.string().refine((val) => boards.includes(val), {
    message: "Invalid board",
  }),
  title: z
    .string()
    .min(1, "Title cannot be empty")
    .max(100, "Title must be within 100 characters"),
  body: z
    .string()
    .min(1, "Post cannot be empty")
    .max(4000, "Post must be within 4000 characters"),
});

interface FormData {
  board: string;
  title: string;
  body: string;
}

export function PostCreator() {
  const [formState, setFormState] = useState<FormData>({
    board: boards[0],
    title: "",
    body: "*hello* **world**. type away your post, in <u>markdown</u>.",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const result = formSchema.safeParse(formState);

      if (!result.success) {
        setError(Object.values(result.error.flatten().fieldErrors).join(", "));
        return;
      }

      const response = await createPost(result.data);
      if (!response.success) {
        // select the first error message
        setError(Object.values(response.errors!)[0][0]);
        return;
      }
      console.log("Post created:", response);

      // Redirect to the newly created post
      router.push(`/post/${response.slug}`);
    } catch (err) {
      console.error(err);
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[92vh] flex items-center justify-center md:p-0 px-4">
      <Card className="w-full max-w-4xl mx-auto my-8">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Create a Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <label className="font-medium">Choose a board:</label>
            <RadioGroup
              value={formState.board}
              onValueChange={(value) =>
                setFormState((prev) => ({ ...prev, board: value }))
              }
              className="flex flex-row flex-wrap gap-4"
            >
              {boards.map((boardName) => (
                <div key={boardName} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={boardName}
                    className="text-foreground"
                    id={`board-${boardName}`}
                  />
                  <label
                    htmlFor={`board-${boardName}`}
                    className="text-sm font-medium text-foreground"
                  >
                    {boardName}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <label className="font-medium" htmlFor="title-input">
              Title
            </label>
            <Input
              id="title-input"
              type="text"
              placeholder="Enter post title"
              value={formState.title}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="font-medium">Body</label>
            <div className="w-full border rounded-lg">
              <Suspense fallback={<AnimatedLoader />}>
                <EditorComp
                  markdown={formState.body}
                  onChange={(value) =>
                    setFormState((prev) => ({ ...prev, body: value }))
                  }
                />
              </Suspense>
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
            className="w-full sm:w-auto"
            size="lg"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Publishing..." : "Publish Post"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
