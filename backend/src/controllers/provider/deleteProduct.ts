import { RequestHandler } from "express";
import { prisma } from "../../models/neon";

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const { productId } = req.params;
  const { username: providerUsername } = req.query;
  try {
    if (!providerUsername || !productId) {
      res.status(400).json({ message: "Please provide all required fields" });
      return;
    }

    try {
      await prisma.ordersProvider.deleteMany({
        where: {
          productId: productId,
        },
      });
    } catch (error) {
      console.log("No order found", error);
      res
        .status(400)
        .json({ message: "Product has a command, you cannot delete it" });
      return;
    }

    await prisma.ratingClient.deleteMany({
      where: {
        productId: productId,
      },
    });

    await prisma.products.delete({
      where: {
        productId: productId,
        pricesMerchant: providerUsername as string,
      },
    });

    res.status(200).json({ message: "Product deleted", productId });
  } catch (error) {
    next(error);
  }
};
