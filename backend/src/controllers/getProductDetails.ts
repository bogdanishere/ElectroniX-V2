import { RequestHandler } from "express";
import sql from "../models/neon";

export const getProductDetails: RequestHandler = async (req, res, next) => {
  try {
    const { productId } = req.params as { productId: string };

    const product = await sql`
      SELECT * FROM product WHERE product_id = ${productId}`;

    if (product.length === 0) {
      return res.status(404).json({ status: "Product not found" });
    }

    res.status(200).json({ product: product[0], status: "success" });
  } catch (error) {
    next(error);
  }
};
