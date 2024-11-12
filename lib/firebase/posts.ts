import { collection, doc, getDoc, getDocs, increment, orderBy, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase/app";
import { Post } from "@/lib/post_models";
import { generatePostID } from "@/lib/utils";

// get all posts from a board whose moderation status is not rejected
// todo offset for lazy loading
export async function getPostsByBoard(board: string, orderByField: string = "timestamp") {
  const postsRef = collection(db, "posts");
  const postsSnap = await getDocs(
    query(postsRef,
      where("board", "==", board),
      where("moderation_status", "!=", "rejected"),
      orderBy(orderByField, "desc"),
      // limit(limitTo),
    )
  );

  return postsSnap.docs.map(doc => doc.data()) as Post[];
}

export async function getPostByID(postID: string) {
  const postRef = doc(db, "posts", postID);
  const postSnap = await getDoc(postRef);
  if (!postSnap.exists()) {
    return null;
  }

  return postSnap.data() as Post;
}

export async function savePost(title: string, body: string, board: string) {
  const postID = generatePostID();
  const postRef = doc(db, "posts", postID);

  await setDoc(postRef, {
    id: postID,
    title: title,
    board: board,
    upvotes: 0,
    downvotes: 0,
    comment_count: 0,
    body: body,
    moderation_status: "pending",
    timestamp: Timestamp.now(),
  });

  return postID;
}

export async function updatePostModerationStatus(postID: string, newStatus: "approved" | "rejected") {
  try {
    const docRef = doc(db, "posts", postID)
    await updateDoc(docRef, {
      "moderation_status": newStatus
    })
    return true
  } catch (e) {
    console.error("error in update post moderation status", e)
    return false
  }
}

export async function upvotePost(postID: string, undo: boolean) {
  const postRef = doc(db, "posts", postID)
  try {
    await updateDoc(postRef, {
      "upvotes": increment(undo ? -1 : 1)
    })
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export async function downvotePost(postID: string, undo: boolean) {
  const postRef = doc(db, "posts", postID)
  try {
    await updateDoc(postRef, {
      "downvotes": increment(undo ? -1 : 1)
    })
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}