import { respData, respErr } from "@/lib/resp";
import { ImageGenerateParams } from "openai/resources/images.mjs";
import { getUuid } from "@/lib/hash";

import {uploadImageFromUrl} from "@/services/s3"

import { Wallpaper } from "@/types/wallpaper";

import { insertAffiliate } from "@/models/wallpaper";
import { getIsoTimestr } from "@/lib/time";
import { getUserUuid } from "@/services/user";
import {
  CreditsAmount,
  CreditsTransType,
  decreaseCredits,
  getUserCredits,
} from "@/services/credit";
import { getOpenAIClient } from "@/services/openai";

export async function POST(req: Request) {
  try {
    const client = getOpenAIClient();
    const { description } = await req.json();

    const prompt = `generate a wallpaper with the following description ${description}`;

    const llm_name = "dall-e-3";
    const img_size = "1792x1024";
    const llm_params: ImageGenerateParams = {
      prompt: `generate desktop wallpaper image about ${description}`,
      model: llm_name,
      n: 1,
      quality: "hd",
      response_format: "url",
      size: img_size,
      style: "vivid",
    };
    const res = await client.images.generate(llm_params);
    const datas = res.data;
    if (!datas || datas?.length===0) {
      return respErr("generate wallpaper failed");
    }
    const raw_img_url = datas[0].url || "";
    if (!raw_img_url) {
      return respErr("generate wallpaper failed");
    }
    // const raw_img_url = "http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960";
    console.log("raw_img_url=", raw_img_url);
    const img_name =  encodeURIComponent(description);
    const key = `wallpapers/${getUuid()}.png`;
    const s3_rep = await uploadImageFromUrl(raw_img_url, key);
    const { s3_url } = s3_rep;
    console.log("s3_url=", s3_url);
    const user_uuid = await getUserUuid();

    if (!user_uuid) {
      return respErr("user not login");
    }

    const cost_credits = 3;
    const credits = await getUserCredits(user_uuid);
    if (credits.left_credits < cost_credits) {
      return respErr("not enough credits");
    }
    const wallpaper: Wallpaper = {
      uuid: getUuid(),
      img_description: description,
      created_at: getIsoTimestr(),
      status: "created",
      img_url:s3_url,
    };
    await insertAffiliate(wallpaper);
    // decrease credits for ping
    await decreaseCredits({
      user_uuid,
      trans_type: CreditsTransType.GenWallpaper,
      credits: CreditsAmount.GenWallpaperCost,
    });
    return respData({
      prompt,
      images: wallpaper,
      left_credits: credits.free_credits,
    });
  } catch (e) {
    console.log(e)
    return respErr("generate wallpaper fail");
  }
}
