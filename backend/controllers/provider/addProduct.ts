import { RequestHandler } from "express";
import pool from "../../models/db";
import sharp from "sharp";
import env from "../../env";

export const addProduct: RequestHandler = async (req, res, next) => {
  const productId = Math.random().toString(36).substring(2);

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

  const query = `
    INSERT INTO product (
      product_id, price, currency, weight, name, brand, quantity, 
      prices_availability, prices_condition, prices_merchant, prices_sourceURLs, 
      categories, dateAdded, dateUpdated, imageURLs, sourceURLs, rating, 
      nr_rating, description
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const featureImageUploadPath = "/uploads/products/" + productId + ".png";
  await sharp(featuredImage?.buffer)
    .resize(300, 300)
    .png()
    .toFile("./" + featureImageUploadPath);

  try {
    await pool.execute(query, [
      productId,
      price,
      currency,
      weight,
      name,
      brand,
      quantity,
      "in stock",
      "new",
      providerUsername,
      "null",
      categories,
      new Date().toISOString(),
      new Date().toISOString(),
      env.SERVER_URL + featureImageUploadPath,
      "null",
      0,
      0,
      description,
    ]);

    res.status(200).json({
      message: "Product added successfully",
      productId,
    });
  } catch (error) {
    next(error);
  }
};
