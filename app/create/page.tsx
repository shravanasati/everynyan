import { PostCreator } from "@/components/PostCreator";
import { isLoggedIn } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function CreatePost() {
  if (!await isLoggedIn()) {
    redirect("/login");
  }

  return <PostCreator />;
}

// export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => <EditorComp {...props} editorRef={ref} />);
// ForwardRefEditor.displayName = 'ForwardRefEditor'