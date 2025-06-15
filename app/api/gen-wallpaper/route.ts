import { respData, respErr } from "@/lib/resp";
import { experimental_generateImage as generateImage } from "ai";
import { replicate } from "@ai-sdk/replicate";
import { getUuid } from "@/lib/hash";
import  path  from "path";
import { writeFile } from "fs/promises";

import { Wallpaper } from "@/types/wallpaper"

import { insertAffiliate } from "@/models/wallpaper"
import { getIsoTimestr } from "@/lib/time";
import { getUserUuid } from "@/services/user";
import { CreditsAmount, CreditsTransType, decreaseCredits, getUserCredits } from "@/services/credit";

export async function POST(req: Request) {
  try {
    const { description } = await req.json();
    const prompt = `generate a wallpaper with the following description ${description}`;
    // const model = "black-forest-labs/flux-schnell";

    // const imageModel = replicate.image(model);
    // const providerOptions = {
    //   replicate: {
    //     output_quality: 90,
    //   },
    // };

    // const { images, warnings } = await generateImage({
    //   model: imageModel,
    //   prompt: prompt,
    //   n: 1,
    //   providerOptions,
    //   aspectRatio:"16:9"
    // });

       
    //   if (warnings.length > 0) {
    //     throw new Error("gen images failed")
    //   }
       
    //   const batch = getUuid();
    //  const provider = "replicate" 
    //   const processedImages = await Promise.all(
    //     images.map(async (image, index) => {
    //       const fileName = `${provider}_image_${batch}_${index}.png`;
    //       const filePath = path.join(process.cwd(), ".tmp", fileName);
       
    //       const buffer = Buffer.from(image.base64, "base64");
    //       await writeFile(filePath, buffer);  
       
    //       return {
    //         provider,
    //         fileName,
    //         filePath,
    //       };
    //     })
    //   );

    const user_uuid = await getUserUuid();

    if (!user_uuid) {
      return respErr("user not login");
    }

    const cost_credits = 3;
    const credits = await getUserCredits(user_uuid);
    if (credits.left_credits < cost_credits) {
      return respErr("not enough credits");
    }

    const wallpaper:Wallpaper = {
      uuid: getUuid(),
      img_description: description,
      created_at:getIsoTimestr(),
      status:"created",
      img_url: "http://gips2.baidu.com/it/u=1649608662,1521733901&fm=3028&app=3028&f=JPEG&fmt=auto?w=2560&h=1920",
    } 

    await insertAffiliate(wallpaper)

    // decrease credits for ping
    await decreaseCredits({
      user_uuid,
      trans_type: CreditsTransType.GenWallpaper,
      credits: CreditsAmount.GenWallpaperCost,
    });


    return respData({
      prompt,
      images:wallpaper,
      left_credits:credits.free_credits,
    });
  } catch (e) {
    return respErr("generate wallpaper fail");
  }
}
