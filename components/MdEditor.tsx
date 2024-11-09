"use client";
import "@mdxeditor/editor/style.css";
import "./MdEditor.css";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  headingsPlugin,
  quotePlugin,
  linkPlugin,
  type MDXEditorMethods,
  type MDXEditorProps,
  markdownShortcutPlugin,
  linkDialogPlugin,
  CreateLink,
} from "@mdxeditor/editor";
import type { ForwardedRef } from "react";

function MdEditor({
  editorRef,
  ...props
}: MDXEditorProps & { editorRef?: ForwardedRef<MDXEditorMethods> }) {
  return (
    <MDXEditor
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {" "}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <CreateLink />
            </>
          ),
        }),
        headingsPlugin(),
        quotePlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        markdownShortcutPlugin(),
      ]}
      {...props}
      ref={editorRef}
      contentEditableClassName="prose"
      className="markdown-editor"
    />
  );
}

export default MdEditor;
