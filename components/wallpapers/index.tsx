import WallpaperCard from "./WallpaperCard";

import { Wallpaper } from "@/types/wallpaper";


export default function Wallpapers ({ wallpapers }:{wallpapers: Wallpaper[] | undefined}) {


  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center max-w-4xl mx-auto">
        {wallpapers && wallpapers.map((wallpaper, idx) => (
          <WallpaperCard
            key={idx}
            image={wallpaper.img_url}
            title={wallpaper.img_description}
            size={wallpaper.status}
            author={wallpaper.status}
            // onDownload={() => alert("下载功能未实现")}
            // onCopyPrompt={() => alert("复制功能未实现")}
          />
        ))}
      </div>
    </div>
  );
};

