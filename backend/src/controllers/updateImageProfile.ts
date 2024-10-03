import { RequestHandler } from "express";
import sql from "../models/neon";
import sharp from "sharp";
import env from "../../env";

export const updateProfile: RequestHandler = async (req, res, next) => {
  const { username } = req.query;
  const image_profile = req.file;

  function generateCode(): string {
    const prefix = "AV";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = prefix;

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }

  try {
    if (!username) {
      res.status(400).json({ message: "Please provide all required fields" });
      return;
    }

    if (!image_profile) {
      return res.status(400).json({
        message: "Please provide a featured image",
      });
    }

    const productId = generateCode();

    const updateProfilePic = "/uploads/profilepic/" + productId + ".png";
    await sharp(image_profile?.buffer)
      .resize(300, 300)
      .png()
      .toFile("./" + updateProfilePic);

    await sql`
      UPDATE users
      SET image_profile = ${env.SERVER_URL + updateProfilePic}
      WHERE username = ${username as string}
    `;

    res.status(200).json({
      message: "Profile updated",
      username,
      image_profile: env.SERVER_URL + updateProfilePic,
    });
  } catch (error) {
    next(error);
  }
};
