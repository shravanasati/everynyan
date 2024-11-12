import { collection, doc, limit, getDoc, getDocs, increment, orderBy, query, setDoc, Timestamp, updateDoc, where, startAfter, QueryConstraint, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/lib/firebase/app";
import { Post } from "@/lib/models";
import { generatePostID } from "@/lib/utils";

interface PaginatedResult<T> {
  items: T[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

// get all posts from a board whose moderation status is not rejected
export async function getPostsByBoard(board: string, orderByField: string = "timestamp", lastDoc: Post | null = null, limitTo: number = 10) {
  const postsRef = collection(db, "posts");

  const constraints: QueryConstraint[] = [
    where("board", "==", board),
    where("moderation_status", "!=", "rejected"),
    orderBy(orderByField, "desc"),
    limit(limitTo + 1),
  ]
  if (lastDoc) {
    constraints.push(startAfter(lastDoc))
  }

  const q = query(postsRef, ...constraints)

  const postsSnap = await getDocs(q)
  const docs = postsSnap.docs;
  const hasMore = docs.length > limitTo;
  const items = docs.slice(0, limitTo).map(doc => doc.data()) as Post[];

  const result: PaginatedResult<Post> = {
    items,
    lastDoc: hasMore ? docs[docs.length - 2] : null,
    hasMore
  }

  return result
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

async function votePost(postID: string, undo: boolean, field: "upvotes" | "downvotes") {
  const postRef = doc(db, "posts", postID)
  try {
    await updateDoc(postRef, {
      [field]: increment(undo ? -1 : 1)
    })
    return true
  } catch (e) {
    console.error(e)
    return false
  }

}

export async function upvotePost(postID: string, undo: boolean) {
  return await votePost(postID, undo, "upvotes")
}

export async function downvotePost(postID: string, undo: boolean) {
  return await votePost(postID, undo, "downvotes")
}