import { RequestHandler } from "express";
import sql from "../models/neon";

export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const itemsPerPage = parseInt(req.query.limit as string, 10);
    const pageNumber = parseInt(req.query.page as string, 10);

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({ error: "Invalid page number" });
    }

    if (isNaN(itemsPerPage) || itemsPerPage < 1) {
      return res.status(400).json({ error: "Invalid items per page number" });
    }

    const sortOrder = (req.query.sort as string)?.toLowerCase();
    const offset = (pageNumber - 1) * itemsPerPage;
    let query;

    // BLAME JAVASCRIPT FOR NOT WORKING AS EXPECTED
    if (sortOrder.toLowerCase() === "asc") {
      query = sql`
        SELECT * FROM product
        ORDER BY price ASC
        LIMIT ${itemsPerPage} OFFSET ${offset}
      `;
    } else if (sortOrder.toLowerCase() === "desc") {
      query = sql`
      SELECT * FROM product
      ORDER BY price DESC
      LIMIT ${itemsPerPage} OFFSET ${offset}
    `;
    } else {
      query = sql`
      SELECT * FROM product
      LIMIT ${itemsPerPage} OFFSET ${offset}
    `;
    }

    const products = await query;

    res.status(200).json({
      products,
      pageNumber,
      itemsPerPage,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
