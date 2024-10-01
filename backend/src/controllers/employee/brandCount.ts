import { RequestHandler } from "express";
import sql from "../../models/neon";

export const brandCount: RequestHandler = async (req, res, next) => {
  const { numberOfBrandsToShow } = req.params;

  const limit = parseInt(numberOfBrandsToShow, 10);

  if (isNaN(limit) || limit < 1) {
    return res
      .status(400)
      .json({ message: "Invalid number of brands to show" });
  }

  try {
    const brands = await sql`SELECT brand, COUNT(*) AS numar_produse
    FROM product
    GROUP BY brand
    ORDER BY numar_produse DESC
    LIMIT ${limit}`;

    res.status(200).json({ brands: brands });
  } catch (error) {
    console.error("Database error:", error);
    next(error);
  }
};
