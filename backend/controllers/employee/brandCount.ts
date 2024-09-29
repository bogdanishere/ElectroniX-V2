import { RequestHandler } from "express";
import pool from "../../models/db";

export const brandCount: RequestHandler = async (req, res, next) => {
  const { numberOfBrandsToShow } = req.params;

  const limit = parseInt(numberOfBrandsToShow, 10);

  if (isNaN(limit) || limit < 1) {
    return res
      .status(400)
      .json({ message: "Invalid number of brands to show" });
  }

  const query = `
    SELECT brand, COUNT(*) AS numar_produse
    FROM product
    GROUP BY brand
    ORDER BY numar_produse DESC
    LIMIT ${limit}
  `;

  try {
    const [brands] = await pool.query(query);

    res.status(200).json({ brands });
  } catch (error) {
    console.error("Database error:", error);
    next(error);
  }
};
