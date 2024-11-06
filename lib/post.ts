import { Timestamp } from "firebase/firestore";

export type Post = {
	id: string;
	title: string;
	upvotes: number;
	downvotes: number;
	board: string;
	body: string;
	moderation_status: "pending" | "approved" | "rejected";
	comments: Comment[];
};

export type Comment = {
	id: string;
	post_id: string;
	body: string;
	upvotes: number;
	downvotes: number;
	moderation_status: "pending" | "approved" | "rejected";
	comments: Comment[];
};