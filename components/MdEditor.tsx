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
  listsPlugin,
  linkPlugin,
  // thematicBreakPlugin,
  type MDXEditorMethods,
  type MDXEditorProps,
  markdownShortcutPlugin,
} from "@mdxeditor/editor";
import type {ForwardedRef} from "react";

function MdEditor({editorRef, ...props}: MDXEditorProps & { editorRef?: ForwardedRef<MDXEditorMethods> }) {
  return (
    <MDXEditor
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {" "}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </>
          ),
        }),
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        // thematicBreakPlugin(),
        linkPlugin(),
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
