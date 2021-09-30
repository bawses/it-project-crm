import nc from "next-connect";
import { v2 as cloudinary } from "cloudinary";

import multer from "multer";
const upload = multer({ dest: "/profile_images" });

const handler = nc();

handler.use(
  upload.single("profilePicture"),
).post(async (req: any, res: any) => {
  console.log("--------")
  console.log(req.body);
  console.log(req.file);
  console.log("--------")

  if (req.file){
    const image = await cloudinary.uploader.upload(req.file.path, {
      crop: "fill"
    });

    return res.status(200).json({success: true, imageUrl: image.secure_url});
  }
  return res.status(400).json({success: false});
})

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;