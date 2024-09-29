import { RequestHandler } from "express";
import pool from "../models/db";

interface ProductProps {
  product_id: string;
  price: string;
  currency: string;
  weight: string;
  name: string;
  brand: string;
  quantity: number;
  prices_availability: string;
  prices_condition: string;
  prices_merchant: string;
  prices_sourceURLs: string;
  categories: string;
  dateAdded: string;
  dateUpdated: string;
  imageURLs: string | string[];
  sourceURLs?: string;
  rating: string;
  nr_rating: number;
  description: string;
  quality: string;
}

export const getProductDetails: RequestHandler = async (req, res, next) => {
  try {
    const { productId } = req.params as { productId: string };

    const [productArray] = await pool.query(
      "SELECT * FROM product WHERE product_id = ?",
      [productId]
    );

    const product = (productArray as ProductProps[])[0];

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (typeof product.imageURLs === "string") {
      product.imageURLs = product.imageURLs
        .split(",")
        .map((url: string) => url.trim());
    }

    delete product.sourceURLs;

    res.status(200).json({ product, status: "success" });
  } catch (error) {
    next(error);
  }
};
