"use client";
import { useEffect, useState, useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Gifs } from "@/lib/models";
import { fetchGifs } from "@/lib/actions/fetchGifs";
import { Loader2 } from "lucide-react";
import { placeHolderGifs } from "@/public/placeholderGifs";

function GifInput() {
  // states
  const [fetchingGif, setFetchingGif] = useState<boolean>(false); // to set loader
  const [fetchedGifs, setFetchedGifs] = useState<Gifs[]>(placeHolderGifs); //to set fetched gifs
  const [query, setQuery] = useState<string>(""); //to handle search query

  // query handling with debouncing
  //eslint-disable-next-line
  const changeQuery = useCallback(
    debounce((value: string) => {
      setQuery(value);
    }, 1000),
    []
  );

  // fetch GIFs based on query
  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      setFetchingGif(true);
      try {
        const response = await fetchGifs(query);
        if (response?.results) {
          //eslint-disable-next-line
          const gifs = response.results.map((gif: any) => ({
            src: gif.media_formats?.gif?.url || "",
            alt: gif.title || "GIF",
            height: gif.media_formats?.gif?.dims?.[1] || 500,
            width: gif.media_formats?.gif?.dims?.[0] || 500,
          }));
          setFetchedGifs(gifs);
        } else {
          console.error("Invalid response format");
        }
      } catch (error) {
        console.error("Failed to fetch GIFs:", error);
      } finally {
        setFetchingGif(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent
          className="bg-[#090909] h-[90vh] w-full sm:max-w-none"
          side="bottom"
        >
          <SheetHeader className="mt-6 mb-2">
            <Input
              placeholder="Search for GIFs from Tenor"
              onChange={(e) => changeQuery(e.target.value)}
            />
          </SheetHeader>
          <ScrollArea className="h-[calc(90vh-80px)] w-full py-3">
            <div className="h-full w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-2">
              {fetchingGif ? (
                <div className="flex items-center justify-center w-screen h-[calc(90vh-80px)] overflow-hidden">
                  <div className="flex items-center space-x-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-lg font-medium text-primary">
                      Fetching GIFs
                    </p>
                  </div>
                </div>
              ) : (
                fetchedGifs.map((gif, index) => (
                  <div
                    key={index}
                    className="aspect-square relative overflow-hidden rounded-md"
                  >
                    <Image
                      alt={gif.alt}
                      src={gif.src}
                      layout="fill"
                      objectFit="cover"
                      unoptimized
                    />
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// a function to debounce (thanks claude)
function debounce(func: (value: string) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return (value: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(value), wait);
  };
}

export default GifInput;
