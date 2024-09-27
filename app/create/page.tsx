import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
});

const CreatePost = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-5 gap-2 h-screen">
      <div className="col-span-2 row-span-4 col-start-2 row-start-2">
        <TextEditor className=""/>
      </div>
      <div className="col-span-3 col-start-1 row-start-1 bg-green-400">
        Navbar
      </div>
      <div className="row-span-4 col-start-1 row-start-2 bg-indigo-300">
        Sidebar
      </div>
    </div>
  );
};

export default CreatePost;
