import { Wallpaper } from "@/types/wallpaper";
import { getSupabaseClient } from "./db";

export async function insertAffiliate(wallpaper: Wallpaper) {
  const db = getSupabaseClient();
  const { data, error } = await db.from("wallpapers").insert(wallpaper);
  if (error) {
    throw error;
  } 
  return data;
}


export async function getWallpapers(
    page: number = 1,
    limit: number = 50
  ): Promise<Wallpaper[] | undefined> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("wallpapers")
      .select("*")
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit);
  
    if (error) {
      console.error("Error fetching user invites:", error);
      return [];
    }
  
    if (!data || data.length === 0) {
      return undefined;
    }
  
    // const user_uuids = Array.from(new Set(data.map((item) => item.user_uuid)));
  
    // const users = await getUsersByUuids(user_uuids);
    // const affiliates = data.map((item) => {
    //   const user = users.find((user) => user.uuid === item.user_uuid);
    //   return { ...item, user };
    // });
  
    return data;
  }
  
