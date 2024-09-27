"use client";

import { useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorProvider } from "@tiptap/react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Bold, Italic, Strikethrough } from "lucide-react";
import { cn } from "@/lib/utils";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-border">
      <Button
        variant={editor.isActive("bold") ? "secondary" : "outline"}
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("italic") ? "secondary" : "outline"}
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("strike") ? "secondary" : "outline"}
        size="icon"
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
    </div>
  );
};

const extensions = [
  StarterKit.configure({
    heading: false,
    bulletList: false,
    orderedList: false,
    listItem: false,
  }),
];

const content = `
<p>
  Welcome to the dark-themed shadcn/ui text editor
</p>
<p>
  This is a <em>sleek</em> example of a <strong>text editor</strong> with minimal formatting options.
</p>
<p>
  You can apply <strong>bold</strong>, <em>italic</em>, and <s>strikethrough</s> formatting to your text.
</p>
<p>
  Feel free to experiment with the available options!
</p>
`;

interface TextEditorProps {
  className?: string;
}

export default function TextEditor({ className }: TextEditorProps) {
  const [editorContent, setEditorContent] = useState(content);

  const handleUpdate = ({ editor }: { editor: any }) => {
    setEditorContent(editor.getHTML());
  };

  const sendToBackend = async () => {
    try {
      const response = await fetch("/api/save-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editorContent }),
      });

      if (response.ok) {
        console.log("Content saved successfully");
      } else {
        console.error("Failed to save content");
      }
    } catch (error) {
      console.error("Error sending content to backend:", error);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen bg-background text-foreground p-4",
        className
      )}
    >
      <Card className="max-w-3xl mx-auto mt-8 border-border bg-card">
        <EditorProvider
          slotBefore={<MenuBar />}
          extensions={extensions}
          content={content}
          onUpdate={handleUpdate}
          editorProps={{
            attributes: {
              class: "prose prose-invert max-w-full p-4 focus:outline-none",
            },
          }}
        >
          <CardContent>
            {/* The editor content will be rendered here */}
          </CardContent>
        </EditorProvider>
        <CardFooter className="flex justify-end">
          <Button onClick={sendToBackend}>Save Content</Button>
        </CardFooter>
      </Card>
    </div>
  );
}


// "use client"

// import { useCurrentEditor } from "@tiptap/react"
// import StarterKit from "@tiptap/starter-kit"
// import { EditorProvider } from "@tiptap/react"
// import React, { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import { Bold, Italic, Strikethrough } from "lucide-react"
// import { cn } from "@/lib/utils"

// const MenuBar = () => {
//   const { editor } = useCurrentEditor()

//   if (!editor) {
//     return null
//   }

//   return (
//     <div className="flex flex-wrap gap-2">
//       <Button
//         variant={editor.isActive("bold") ? "secondary" : "outline"}
//         size="icon"
//         onClick={() => editor.chain().focus().toggleBold().run()}
//       >
//         <Bold className="h-4 w-4" />
//       </Button>
//       <Button
//         variant={editor.isActive("italic") ? "secondary" : "outline"}
//         size="icon"
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//       >
//         <Italic className="h-4 w-4" />
//       </Button>
//       <Button
//         variant={editor.isActive("strike") ? "secondary" : "outline"}
//         size="icon"
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//       >
//         <Strikethrough className="h-4 w-4" />
//       </Button>
//     </div>
//   )
// }

// const extensions = [
//   StarterKit.configure({
//     heading: false,
//     bulletList: false,
//     orderedList: false,
//     listItem: false,
//   }),
// ]

// const content = `
// <p>
//   Welcome to the compact shadcn/ui text editor
// </p>
// <p>
//   This is a <em>sleek</em> example of a <strong>text editor</strong> with minimal formatting options.
// </p>
// <p>
//   You can apply <strong>bold</strong>, <em>italic</em>, and <s>strikethrough</s> formatting to your text.
// </p>
// `

// interface TextEditorProps {
//   className?: string
// }

// export default function TextEditor({ className }: TextEditorProps) {
//   const [editorContent, setEditorContent] = useState(content)

//   const handleUpdate = ({ editor }: { editor: any }) => {
//     setEditorContent(editor.getHTML())
//   }

//   const sendToBackend = async () => {
//     try {
//       const response = await fetch("/api/save-content", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ content: editorContent }),
//       })

//       if (response.ok) {
//         console.log("Content saved successfully")
//       } else {
//         console.error("Failed to save content")
//       }
//     } catch (error) {
//       console.error("Error sending content to backend:", error)
//     }
//   }

//   return (
//     <Card className={cn("w-full max-w-3xl mx-auto", className)}>
//       <CardHeader>
//         <MenuBar />
//       </CardHeader>
//       <CardContent className="p-0">
//         <EditorProvider
//           extensions={extensions}
//           content={content}
//           onUpdate={handleUpdate}
//           editorProps={{
//             attributes: {
//               class: "prose prose-sm dark:prose-invert max-w-full p-4 focus:outline-none min-h-[200px] max-h-[400px] overflow-y-auto",
//             },
//           }}
//         >
//           {/* The editor content will be rendered here */}
//         </EditorProvider>
//       </CardContent>
//       <CardFooter className="flex justify-end">
//         <Button onClick={sendToBackend}>Save Content</Button>
//       </CardFooter>
//     </Card>
//   )
// }
