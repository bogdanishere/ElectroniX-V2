import { RequestHandler } from "express";
import { prisma } from "../models/neon";

export const addReview: RequestHandler = async (req, res, next) => {
  try {
    const {
      productID,
      title,
      review,
      username: clientUsername,
      rating: userRating,
    } = req.body;

    const productIfExist = await prisma.products.findUnique({
      where: {
        productId: productID,
      },
    });

    if (!productIfExist) res.status(404).json({ message: "Product not found" });

    const reviewExist = await prisma.ratingClient.findFirst({
      where: {
        productId: productID,
        clientUsername,
      },
    });

    if (reviewExist) {
      return res
        .status(400)
        .json({ message: "You already reviewed this product" });
    }

    await prisma.ratingClient.create({
      data: {
        productId: productID,
        title,
        review,
        clientUsername,
        rating: userRating,
        dateCreated: new Date(),
      },
    });

    const product = await prisma.products.findUnique({
      where: {
        productId: productID,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const rating = product.rating ?? 0;
    const nr_rating = product.nrOfRatings;

    const avarageRatingATM = Number(rating);
    const totalRatings = Number(nr_rating);
    const newAvarageRating =
      (avarageRatingATM * totalRatings + userRating) / (totalRatings + 1);

    await prisma.products.update({
      where: {
        productId: productID,
      },
      data: {
        rating: newAvarageRating,
        nrOfRatings: totalRatings + 1,
      },
    });

    res
      .status(201)
      .json({ message: "Review added successfully", newAvarageRating });
  } catch (error) {
    next(error);
  }
};
