import { collection, getDocs, limit, orderBy, query, startAt, where } from "firebase/firestore";
import { db } from "@/lib/firebase/app";
import { Post } from "@/lib/post";

// get all posts from a board whose moderation status is not rejected
export async function getPostsByBoard(board: string, orderByField: string = "timestamp", limitTo: number = 10, offset: number = 0) {
  const postsRef = collection(db, "posts");
  const postsSnap = await getDocs(
    query(postsRef,
      where("board", "==", board),
      where("moderation_status", "!=", "rejected"),
      orderBy(orderByField),
      limit(limitTo),
      startAt(offset)
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

  return postSnap.docs.map(doc => doc.data())[0] as Post;
}