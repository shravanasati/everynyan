import React, { useState } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import { IGif } from '@giphy/js-types';

const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY!);

interface GiphyPickerProps {
  onGifSelect: (gif: IGif) => void;
}

export function GiphyPicker({ onGifSelect }: GiphyPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const fetchGifs = (offset: number) =>
    gf.search(searchTerm || 'trending', { offset, limit: 10, type: 'gifs', rating: 'pg-13' });

  return (
    <div className="w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search GIFs..."
        className="w-full p-2 mb-2 border rounded-md text-black bg-gray-100"
      />
      <div className="w-full">
        <Grid
          width={window.innerWidth < 900 ? window.innerWidth - 20 : 900}
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