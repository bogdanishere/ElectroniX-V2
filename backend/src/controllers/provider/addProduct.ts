import { RequestHandler } from "express";
import sql from "../../models/neon";
import sharp from "sharp";
import env from "../../../env";

export const addProduct: RequestHandler = async (req, res, next) => {
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

  const productId = generateCode();

  const featuredImage = req.file;
  const {
    price,
    currency,
    weight,
    name,
    brand,
    quantity,
    categories,
    description,
  } = req.body;

  const providerUsername = req.body.username || req.query.username;

  if (
    !price ||
    !currency ||
    !weight ||
    !name ||
    !brand ||
    !quantity ||
    !categories ||
    !description ||
    !providerUsername
  ) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  if (!featuredImage) {
    return res.status(400).json({
      message: "Please provide a featured image",
    });
  }

  const featureImageUploadPath = "/uploads/products/" + productId + ".png";
  await sharp(featuredImage?.buffer)
    .resize(300, 300)
    .png()
    .toFile("./" + featureImageUploadPath);

  try {
    await sql`
      INSERT INTO product (
        product_id,
        name,
        price,
        currency,
        weight,
        brand,
        quantity,
        prices_availability,
        prices_merchant,
        categories,
        dateadded,
        dateupdated,
        imageurls,
        rating,
        nr_rating,
        description
      ) VALUES (
        ${productId},
        ${name},
        ${price},
        ${currency},
        ${weight},
        ${brand},
        ${quantity},
        ${"in stock"},
        ${providerUsername},
        ${categories},
        ${new Date().toISOString()},
        ${new Date().toISOString()},
        ${env.SERVER_URL + featureImageUploadPath},
        ${0},
        ${0},
        ${description}
      )
    `;

    res.status(200).json({
      message: "Product added successfully",
      productId,
    });
  } catch (error) {
    next(error);
  }
};
