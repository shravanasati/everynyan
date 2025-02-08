"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Post as PostType } from "@/lib/models";
import { LoadingPost, CaughtUp } from "@/components/LoadingPost";
import PostComponent from "@/components/Posts/Post";
import { PaginatedResult } from "@/lib/firebase/posts";
import { useToast } from "@/hooks/use-toast";
import { SortDropdown } from "@/components/SortDropdown";

interface InfiniteScrollingPostsProps {
  boardName: string | null;
  data: string;
}

const sortByFields = [
  {
    title: "Latest",
    value: "timestamp",
  },
  {
    title: "Popular",
    value: "upvotes",
  },
  {
    title: "Controversial",
    value: "downvotes",
  },
  {
    title: "Engaging",
    value: "comment_count",
  },
];

const compareObjects = (obj1: unknown, obj2: unknown) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const cachePosts = (posts: PostType[]) => {
  for (const post of posts) {
    sessionStorage.setItem(post.id, JSON.stringify(post));
  }
}

export function InfiniteScrollingPosts({
  boardName,
  data,
}: InfiniteScrollingPostsProps) {
  const dataObj = JSON.parse(data);
  const [posts, setPosts] = useState<PostType[]>(dataObj.items);
  const [lastDocID, setLastDocID] = useState<string | null>(dataObj.lastDocID);
  const [hasMore, setHasMore] = useState(dataObj.hasMore);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<string>(dataObj.orderByField);
  let urlParams = {
    board: dataObj.boardName,
    lastDocID: dataObj.lastDocID,
    orderByField: dataObj.orderByField,
    limitTo: dataObj.limit
  };

  useEffect(() => {
    if (sessionStorage.getItem("sortBy")) {
      setSortBy(sessionStorage.getItem("sortBy")!);
    }
  }, []);

  useEffect(() => {
    cachePosts(posts);
  }, [posts]);


  const { toast } = useToast();
  const { ref, inView } = useInView();

  const fetchMore = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;

    // console.log("Fetching more posts...", {
    //   reset,
    //   boardName,
    //   lastDocID,
    //   sortBy,
    // });

    setLoading(true);
    try {
      const searchParams = new URLSearchParams();
      if (boardName) searchParams.append("board", boardName);

      // Only append lastDocID if not resetting
      if (!reset && lastDocID) {
        searchParams.append("lastDocID", lastDocID);
      }

      searchParams.append("limitTo", "10");
      searchParams.append("orderByField", sortBy);

      const resp = await fetch("/api/posts?" + searchParams.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result: PaginatedResult<PostType> & { error: string } =
        await resp.json();

      if (resp.status !== 200) {
        throw new Error(result.error);
      }

      // If resetting, replace posts completely
      // If not resetting, append new posts
      setPosts((prev) => (reset ? result.items : [...prev, ...result.items]));

      setLastDocID(result.lastDocID);
      setHasMore(result.hasMore);
      urlParams = { board: result.boardName, lastDocID: result.lastDocID, orderByField: result.orderByField, limitTo: result.limit };
    } catch (error) {
      console.error("Error fetching posts:", error);
      setHasMore(false);
      toast({
        title: "Post fetching failed",
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll
  useEffect(() => {
    if (inView && !loading) {
      fetchMore();
    }
  }, [inView, loading]); // Added loading to dependency array

  // New useEffect to handle sort changes
  useEffect(() => {
    // Reset and fetch when sort changes
    if (sortBy === undefined) return;
    const newParams = {
      board: boardName,
      lastDocID: lastDocID,
      orderByField: sortBy,
      limitTo: 10,
    }
    if (compareObjects(newParams, urlParams)) {
      return
    };
    sessionStorage.setItem("sortBy", sortBy);
    setPosts([]);
    setLastDocID(null);
    setHasMore(true);
    fetchMore(true);
  }, [sortBy]); // Trigger fetch when sortBy changes

  const handleSortChange = (value: string) => {
    setSortBy(value);
    // Removed redundant reset logic as it's now in useEffect
  };

  return (
    <>
      <div className="mb-4">
        <SortDropdown
          options={sortByFields}
          value={sortBy}
          onValueChange={handleSortChange}
        />
      </div>
      {posts.length === 0 && !loading ? (
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
      {loading && <LoadingPost />}
      {!hasMore && posts.length > 0 && <CaughtUp />}
      <div ref={ref} className="h-10" />
    </>
  );
}
