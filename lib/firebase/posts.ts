import { collection, doc, getDocs, increment, orderBy, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase/app";
import { Post } from "@/lib/post";
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

export async function updatePostModerationStatus(postID: string, newStatus: "approved" | "rejected") {
  // todo optimize this query to use board_postID instead of id directly as docRef
  try {
    const q = query(collection(db, "posts"), where("id", "==", postID))

    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      return false
    }
    const document = querySnapshot.docs[0]
    const docRef = doc(db, "posts", document.id)
    await updateDoc(docRef, {
      "moderation_status": newStatus
    })
    return true
  } catch (e) {
    console.error("error in update post moderation status", e)
    return false
  }
}

export async function upvotePost(board: string, postID: string, undo: boolean) {
  const postRef = doc(db, "posts", `${board}_${postID}`)
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

export async function downvotePost(board: string, postID: string, undo: boolean) {
  const postRef = doc(db, "posts", `${board}_${postID}`)
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