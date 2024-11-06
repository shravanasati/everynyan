import { PostCreator } from "@/components/PostCreator";
import { getAuthUser } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function CreatePost() {
  if (!await getAuthUser()) {
    redirect("/login");
  }

  return <PostCreator />;
}

// export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => <EditorComp {...props} editorRef={ref} />);
// ForwardRefEditor.displayName = 'ForwardRefEditor'