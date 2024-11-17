import { RequestHandler } from "express";
import { prisma } from "../models/neon";

export const getReview: RequestHandler = async (req, res, next) => {
  console.log(req.params.productID);
  try {
    const review = await prisma.ratingClient.findMany({
      where: {
        productId: req.params.productID,
      },
    });

    console.log(review);

    res.status(200).json({
      review: review,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
