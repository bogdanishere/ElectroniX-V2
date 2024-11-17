import { RequestHandler } from "express";
import { prisma } from "../../models/neon";

export const showProviderProducts: RequestHandler = async (req, res, next) => {
  const { username: providerUsername } = req.query;
  const { page } = req.params;
  const limit = 5;

  if (!providerUsername || !page) {
    res
      .status(400)
      .json({ message: "Provider username and page are required" });
    return;
  }

  try {
    const provider = await prisma.provider.findUnique({
      where: {
        username: providerUsername as string,
      },
    });

    if (!provider) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }

    const offset =
      (parseInt(page) - 1) * limit ? (parseInt(page) - 1) * limit : 0;

    const products = await prisma.products.findMany({
      where: {
        pricesMerchant: providerUsername as string,
      },
      orderBy: {
        dateAdded: "desc",
      },
      take: limit,
      skip: offset,
    });

    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};
