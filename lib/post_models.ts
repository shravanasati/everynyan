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
};

export type Comment = {
	id: string;
	body: string;
	upvotes: number;
	downvotes: number;
	parent_id: string | null;
	moderation_status: ModerationStatus;
};