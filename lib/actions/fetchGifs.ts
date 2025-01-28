"use server";

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

export async function fetchGifs(query: string) {
    if (!GIPHY_API_KEY) {
        console.error("GIPHY_API_KEY is not defined.");
        return null;
    }

    try {
        console.log(query)
        const giphyQueryUrl = ``;

        const response = await fetch(giphyQueryUrl, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
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
