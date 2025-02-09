import  { useRef, useState, useEffect } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import { IGif } from '@giphy/js-types';

const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY!);

interface GiphyPickerProps {
  onGifSelect: (gif: IGif) => void;
}

export function GiphyPicker({ onGifSelect }: GiphyPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchGifs = (offset: number) =>
    gf.search(debouncedTerm || 'trending', { offset, limit: 10, type: 'gifs', rating: 'pg-13', sort: "relevant" });

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(900);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="w-full" ref={containerRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search GIFs..."
        className="w-full p-2 mb-2 border rounded-md text-black bg-gray-100"
      />
      <div className="w-full">
        <Grid
          key={debouncedTerm}
          width={containerWidth}
          columns={window.innerWidth < 600 ? 2 : 3}
          fetchGifs={fetchGifs}
          onGifClick={(gif, e) => {
            e.preventDefault();
            onGifSelect(gif);
          }}
        />
      </div>
    </div>
  );
}