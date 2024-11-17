import { RequestHandler } from "express";

import { prisma } from "../models/neon";

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

    const products = await prisma.products.findMany({
      take: itemsPerPage,
      skip: offset,
      orderBy: {
        price: sortOrder === "asc" ? "asc" : "desc",
      },
    });

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
