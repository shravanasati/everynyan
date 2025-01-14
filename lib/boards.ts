export interface Board {
	title: string;
	description: string;
	href: string;
	imageSrc: string;
	imageAlt: string;
}

export const boardList: Board[] = [
	{
		title: "Confessions",
		description: "Share your anonymous confessions and stories with the community in a safe, judgment-free space.",
		href: "confessions",
		imageSrc: "/boards/confessions.jpg",
		imageAlt: "Anonymous confessions board"
	},
	{
		title: "Gyan",
		description: "Exchange knowledge, academic insights, and career advice with fellow students and alumni.",
		href: "gyan",
		imageSrc: "/boards/nerd.jpg",
		imageAlt: "Knowledge sharing board"
	},
	{
		title: "Yap",
		description: "Your go-to space for casual conversations, campus life discussions, and making new friends.",
		href: "yap",
		imageSrc: "/boards/yap.jpg",
		imageAlt: "General discussion board"
	},
	{
		title: "Random",
		description: "The perfect place for everything else - memes, shower thoughts, and unexpected discussions.",
		href: "random",
		imageSrc: "/boards/random.jpg",
		imageAlt: "Miscellaneous topics board"
	}
];