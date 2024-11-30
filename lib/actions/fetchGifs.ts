"use server";

const TENOR_API_KEY = process.env.TENOR_API_KEY;

export async function fetchGifs(query: string) {
    if (!TENOR_API_KEY) {
        console.error("TENOR_API_KEY is not defined.");
        return null;
    }

    try {
        const tenorQueryUrl = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=${TENOR_API_KEY}&limit=20`;

        const response = await fetch(tenorQueryUrl, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });

        if (!response.ok) {
            console.error(`Failed to fetch GIFs: ${response.status} ${response.statusText}`);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching GIFs:", error);
        return null;
    }
}
