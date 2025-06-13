import WallpaperCard from "./WallpaperCard";

const wallpapers = [
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    title: "印度",
    size: "1792×1024",
    author: "User1",
  },
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    title: "日本",
    size: "1792×1024",
    author: "User2",
  },
  {
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    title: "法国",
    size: "1792×1024",
    author: "User3",
  },
];

const Wallpapers = () => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {wallpapers.map((wallpaper, idx) => (
          <WallpaperCard
            key={idx}
            image={wallpaper.image}
            title={wallpaper.title}
            size={wallpaper.size}
            author={wallpaper.author}
            // onDownload={() => alert("下载功能未实现")}
            // onCopyPrompt={() => alert("复制功能未实现")}
          />
        ))}
      </div>
    </div>
  );
};

export default Wallpapers;
