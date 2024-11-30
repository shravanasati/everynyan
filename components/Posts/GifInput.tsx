"use client";
import React, { useEffect, useState } from "react";
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

// !! todo implement search of gif with debouncing to conform to the 1 req/s

function GifInput() {
  // an object with some default gifs, as of now it is same gif
  const defaultGifs: Gifs[] = Array.from({ length: 20 }, () => ({
    src: "https://media1.tenor.com/m/-tF8v7bEPfEAAAAd/hello-darwisy-hello-everynyan.gif",
    alt: "Placeholder GIF",
    height: 500,
    width: 500,
  }));

  // function to handle query change with debouncing
  const changeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // state to store gifs
  const [fetchedGifs, setFetchedGifs] = useState<Gifs[]>(defaultGifs);
  // state for the searchquery
  const [query, setQuery] = useState<string>("");

  // fetch gifs based on the search, as of now it is fetching on the mount
  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        const response = await fetchGifs(query);
        if (response && response.results) {
          //eslint-disable-next-line
          const gifs = response.results.map((gif: any) => ({
            src: gif.media_formats.gif.url,
            alt: gif.title || "GIF",
            height: gif.media_formats.gif.dims[1],
            width: gif.media_formats.gif.dims[0],
          }));
          setFetchedGifs(gifs); // update the state to match the query
        }
      };

      fetchData();
    }, 1000);
  }, [query]);

  return (
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
            value={query}
            onChange={(e) => changeQuery(e)}
          />
        </SheetHeader>
        <ScrollArea className="h-[calc(90vh-80px)] w-full py-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-2">
            {fetchedGifs.map((gif, index) => (
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
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default GifInput;
