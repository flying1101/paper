import React from "react";

interface WallpaperCardProps {
  image: string;
  title: string;
  size: string;
  author?: string;
  // onDownload?: () => void;
  // onCopyPrompt?: () => void;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({
  image,
  title,
  size,
  author,
  // onDownload,
  // onCopyPrompt,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col w-full max-w-xs gap-2">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-lg text-gray-700 mb-2">{title}</div>
          {/* <div className="inline-block bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs font-semibold mb-2">{size}</div> */}
        </div>
        {/* <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <span className="inline-block w-8 h-8 bg-gradient-to-tr from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z"/></svg>
            </span>
          </div>
        </div> */}
        {/* <div className="flex items-center justify-between mt-6">
          <button
            // onClick={onDownload}
            className="font-bold text-black flex items-center gap-1 hover:underline"
          >
            DOWNLOAD
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M5 20h14v-2H5v2Zm7-18c-.55 0-1 .45-1 1v10.59l-3.29-3.3a.996.996 0 1 0-1.41 1.41l5 5c.39.39 1.02.39 1.41 0l5-5a.996.996 0 1 0-1.41-1.41L13 13.59V3c0-.55-.45-1-1-1Z"/></svg>
          </button>
          <button
            // onClick={onCopyPrompt}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-6 py-2"
          >
            Copy Prompt
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default WallpaperCard; 