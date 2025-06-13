"use client";

import { useState } from 'react';

export default function Generator() {

  const [description, setDescription] = useState('');

  const handleGenerate = () => {
    // 这里可以添加生成逻辑
    console.log('Generate:', description);
  };

  return (
    <div className="flex items-center gap-4 w-full max-w-3xl mx-auto mt-8">
      <input
        type="text"
        className="flex-1 rounded-2xl border border-gray-200 px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Wallpaper description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-2xl px-8 py-4 text-lg transition"
        onClick={handleGenerate}
      >
        Generate
      </button>
    </div>
  );
};

