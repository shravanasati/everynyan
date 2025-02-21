import Image from 'next/image';

export function GiphyAttribution() {
  return (
    <div className="flex items-center text-sm text-gray-500">
      <a 
        href="https://giphy.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Image
          src="/giphy_attribution_logo.png"
          alt="GIPHY"
          width={154}
          height={20}
          className="dark:invert rounded"
        />
      </a>
    </div>
  );
}