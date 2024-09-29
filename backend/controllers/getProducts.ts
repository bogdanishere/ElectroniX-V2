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
  sourceURLs: string;
  rating: string;
  nr_rating: number;
  description: string;
  quality: string;
}

export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const itemsPerPage = parseInt(req.query.limit as string);
    const pageNumber = parseInt(req.query.page as string);

    if (pageNumber < 1 || isNaN(pageNumber)) {
      return res.status(400).json({ error: "Invalid page number" });
    }
    const sortOrder = (req.query.sort as string) || "desc";

    const offset = (pageNumber - 1) * itemsPerPage;

    let query = "SELECT * FROM product";
    if (sortOrder === "asc" || sortOrder === "desc") {
      query += ` ORDER BY price ${sortOrder}`;
    } else {
      query += " ORDER BY quality DESC";
    }
    query += " LIMIT ? OFFSET ?";

    const [products] = await pool.query(query, [itemsPerPage, offset]);

    const transformedProducts = (products as ProductProps[]).map((product) => {
      if (typeof product.imageURLs === "string") {
        product.imageURLs = product.imageURLs
          .split(",")
          .map((url: string) => url.trim());
      }
      return product;
    });

    res.status(200).json({
      products: transformedProducts,
      pageNumber,
      itemsPerPage,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
