import { RequestHandler } from "express";
import { prisma } from "../../models/neon";

export const brandCount: RequestHandler = async (req, res, next) => {
  const { numberOfBrandsToShow } = req.params;

  const limit = parseInt(numberOfBrandsToShow, 10);

  if (isNaN(limit) || limit < 1) {
    return res
      .status(400)
      .json({ message: "Invalid number of brands to show" });
  }

  try {
    const brands = await prisma.products.groupBy({
      by: ["brand"],
      _count: {
        brand: true,
      },
      orderBy: {
        _count: {
          brand: "desc",
        },
      },
      take: limit,
    });

    console.log(brands);

    res.status(200).json({ brands });
  } catch (error) {
    console.error("Database error:", error);
    next(error);
  }
};
