import { RequestHandler } from "express";
import { prisma } from "../models/neon";

export const getProductDetails: RequestHandler = async (req, res, next) => {
  try {
    const { productId } = req.params as { productId: string };

    const product = await prisma.products.findUnique({
      where: {
        productId: productId,
      },
    });

    if (!product) {
      return res.status(404).json({ status: "Product not found" });
    }

    res.status(200).json({ product, status: "success" });
  } catch (error) {
    next(error);
  }
};
