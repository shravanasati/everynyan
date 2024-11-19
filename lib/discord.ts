interface discordWebhookReportProps {
    type: "post" | "comment",
    commentID?: string,
    postID?: string,
    selectedFlag: string
}
export async function discordWebhookReport({ type, commentID, postID, selectedFlag }: discordWebhookReportProps) {
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

    if (!DISCORD_WEBHOOK_URL) {
        console.error("DISCORD_WEBHOOK_URL is not defined.");
        return;
    }

    try {
        const content =
            `🚨 **New Report** 🚨\n` +
            (type === "comment"
                ? `**Comment ID:** ${commentID} (Post ID: ${postID})\n`
                : `**Post ID:** ${postID}\n`) +
            `**Selected Flag:** ${selectedFlag}`;

        const discordRes = await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        });

        if (!discordRes.ok) {
            console.error("Discord webhook failed:", discordRes.statusText);
        }
    } catch (err) {
        console.error("Error reporting to Discord webhook:", err);
    }
}
