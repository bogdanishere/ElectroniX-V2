import { RequestHandler } from "express";
import pool from "../models/db";
import { RowDataPacket } from "mysql2";

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

type SortProps = "asc" | "desc" | "none";

export const searchProducts: RequestHandler = async (req, res) => {
  const { page, productName } = req.params as {
    page: string;
    productName: string;
  };

  let sort = req.query.sort as SortProps;

  if (!["asc", "desc", "none"].includes(sort)) sort = "none";

  const productsPerPage = 5;

  let query =
    "SELECT * FROM product WHERE MATCH(name, categories) AGAINST(? IN NATURAL LANGUAGE MODE)";

  if (sort !== "none") {
    query += ` ORDER BY price ${sort}`;
  }

  query += ` LIMIT ? OFFSET ?`;

  try {
    const [results] = await pool.query<RowDataPacket[]>(query, [
      productName,
      productsPerPage,
      productsPerPage * (Number(page) - 1),
    ]);

    const transformedProducts = (results as ProductProps[]).map((product) => {
      if (typeof product.imageURLs === "string") {
        product.imageURLs = product.imageURLs
          .split(",")
          .map((url: string) => url.trim());
      }
      return product;
    });
    return res.json({
      products: transformedProducts,
      pageNumber: Number(page),
      itemsPerPage: productsPerPage,
      status: "success",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
