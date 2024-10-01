import { RequestHandler } from "express";
import sql from "../../models/neon";

export const addProduct: RequestHandler = async (req, res, next) => {
  try {
    const {
      name,
      price,
      currency,
      weight,
      brand,
      quantity,
      prices_availability,
      provider,
      categories,
      imageURLs,
      rating,
      nr_rating,
      description,
    } = req.body;

    if (!name || !price || !currency || !weight || !brand || !quantity) {
      return res
        .status(400)
        .json({ error: "Missing required product information" });
    }

    const providerExists = await sql`
      SELECT * FROM provider WHERE username = ${provider}
    `;

    if (!providerExists[0]) {
      return res.status(400).json({ error: "Provider does not exist" });
    }

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
        ${prices_availability},
        ${provider},
        ${categories},
        ${new Date().toISOString()},
        ${new Date().toISOString()},
        ${imageURLs},
        ${rating},
        ${nr_rating},
        ${description}
      )
    `;

    res.status(201).json({ status: "success" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
