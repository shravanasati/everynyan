import { Timestamp } from "firebase-admin/firestore";

type ModerationStatus = "pending" | "approved" | "rejected";

export type Post = {
	id: string;
	title: string;
	upvotes: number;
	downvotes: number;
	board: string;
	body: string;
	comment_count: number;
	moderation_status: ModerationStatus;
	author?: string;
};

export type Comment = {
	id: string;
	body: string;
	upvotes: number;
	downvotes: number;
	parent_id: string | null;
	level: number;
	moderation_status: ModerationStatus;
	author?: string;
};

export type DBComment = Comment & {
	timestamp: Timestamp;
};