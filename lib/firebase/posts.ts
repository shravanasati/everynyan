import { collection, doc, getDocs, limit, orderBy, query, setDoc, startAt, Timestamp, where } from "firebase/firestore";
import { db } from "@/lib/firebase/app";
import { Post } from "@/lib/post";
import { generatePostID } from "@/lib/utils";

// get all posts from a board whose moderation status is not rejected
export async function getPostsByBoard(board: string, orderByField: string = "timestamp", limitTo: number = 10, offset: number = 0) {
  const postsRef = collection(db, "posts");
  const postsSnap = await getDocs(
    query(postsRef,
      where("board", "==", board),
      where("moderation_status", "!=", "rejected"),
      orderBy(orderByField, "desc"),
      limit(limitTo),
    )
  );

  return postsSnap.docs.map(doc => doc.data()) as Post[];
}

export async function getPostByID(postID: string) {
  const postRef = collection(db, "posts");
  const postSnap = await getDocs(
	query(postRef,
	  where("id", "==", postID)
	)
  );

  if (postSnap.empty) {
    return null;
  }

  return postSnap.docs.map(doc => doc.data())[0] as Post;
}

export async function savePost(title: string, body: string, board: string) {
  const postID = generatePostID();
  const postRef = doc(db, "posts", `${board}_${postID}`);

  await setDoc(postRef, {
    id: postID,
    title: title,
    board: board,
    upvotes: 0,
    downvotes: 0,
    body: body,
    moderation_status: "pending",
    comments: [],
    timestamp: Timestamp.now(),
  });

  return postID;
}
