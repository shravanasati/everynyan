import Post from "@/components/Posts/Post";
import { getAuthUser } from "@/lib/user";
import "@/app/scrollbar.css";
import { Unauthorized } from "@/components/Unauthorized";

interface BoardProps {
  params: {
    boardName: string;
  };
}

async function getBoardData(boardName: string) {
  const boardData = {
    posts: [
      {
        board: boardName,
        title: `Post 2 for ${boardName}`,
        content: `
[Daring Fireball](https://daringfireball.net/projects/markdown/).

In here, you can find the following markdown elements:

* Headings
* Lists
  * Unordered
  * Ordered
  * Check lists
  * And nested ;)
* Links
* Bold/Italic/Underline formatting
* Tables
* Code block editors
* And much more.`,
        upVotes: 12,
        downVotes: 2,
        noOfComments: 10,
      },
    ],
  };
  return boardData;
}

export default async function BoardDetailPage({ params }: BoardProps) {
  if (!(await getAuthUser())) {
    return <Unauthorized />;
  }

  const { boardName } = params;
  const boardData = await getBoardData(boardName);

  return (
    <div className="min-h-[92vh] px-4 flex items-center justify-center">
      <div className="md:w-1/2 w-11/12 min-h-fulll px-2 everynyan-scroll">
        {boardData.posts.map((post, index) => (
          <Post
            key={index}
            title={post.title}
            content={post.content}
            board={post.board}
            upVotes={post.upVotes}
            downVotes={post.downVotes}
            noOfComments={post.noOfComments}
          />
        ))}
      </div>
    </div>
  );
}
