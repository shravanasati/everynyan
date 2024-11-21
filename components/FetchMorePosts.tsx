"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Post as PostType } from "@/lib/models";
import { LoadingPost, CaughtUp } from "@/components/LoadingPost";
import PostComponent from "@/components/Posts/Post";
import { PaginatedResult } from "@/lib/firebase/posts";

interface FetchMorePostsProps {
  boardName: string;
}

export function FetchMorePosts({ boardName }: FetchMorePostsProps) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [lastDocID, setLastDocID] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const initialFetchDone = useRef(false);

  const { ref, inView } = useInView({});

  const fetchMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const resp = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          board: boardName,
          lastDocID: lastDocID,
          limitTo: 10,
          orderByField: "timestamp",
        }),
      });

      const result: PaginatedResult<PostType> & { error: string } = await resp.json();
      if (resp.status !== 200) {
        throw new Error(result.error);
      }

      setPosts((prev) => [...prev, ...result.items]);
      setLastDocID(result.lastDocID);
      setHasMore(result.hasMore);
      setInitialLoad(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    if (initialLoad && !initialFetchDone.current) {
      initialFetchDone.current = true;
      fetchMore();
    }
  }, [boardName]); // eslint-disable-line react-hooks/exhaustive-deps

  // infinite scroll
  useEffect(() => {
    if (!initialLoad && inView && !loading) {
      fetchMore();
    }
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  // loading skeleton
  if (initialLoad) {
    return (
      <>
        <LoadingPost />
        <LoadingPost />
      </>
    );
  }

  return (
    <>
      {posts.length === 0 && !loading && !initialLoad ? (
        <div className="text-center py-8">
          <p className="text-lg font-semibold text-primary">No posts yet!</p>
          <p className="text-sm text-muted-foreground mt-2">
            Be the first to create a post in this board
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <PostComponent
            key={`${post.id}`}
            title={post.title}
            body={post.body}
            board={post.board}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            id={post.id}
            moderation_status={post.moderation_status}
            comment_count={post.comment_count}
          />
        ))
      )}

      {loading && !initialLoad && <LoadingPost />}
      {!hasMore && posts.length > 0 && <CaughtUp />}
      <div ref={ref} className="h-10" />
    </>
  );
}

