import { PostCreator } from "@/components/PostCreator";
import { Unauthorized } from "@/components/Unauthorized";
import { getAuthUser } from "@/lib/user";

export const metadata = {
  title: "Create Post",
  description: "Create a post on everynyan",
};

export default async function CreatePost() {
  if (!await getAuthUser()) {
    return <Unauthorized />;
  }

  return <PostCreator />;
}

// export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => <EditorComp {...props} editorRef={ref} />);
// ForwardRefEditor.displayName = 'ForwardRefEditor'