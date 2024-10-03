import { RequestHandler } from "express";
import sql from "../models/neon";

export const addReview: RequestHandler = async (req, res, next) => {
  try {
    const {
      productID,
      title,
      review,
      username: clientUsername,
      rating: userRating,
    } = req.body;

    const productIfExist = await sql`
      SELECT * FROM product WHERE product_id = ${productID}`;

    if (productIfExist.length === 0 || !productIfExist)
      res.status(404).json({ message: "Product not found" });

    await sql`
    INSERT INTO new_rating (product_id, title, review, client_username, rating)
    VALUES (${productID}, ${title}, ${review}, ${clientUsername}, ${userRating})`;

    const x =
      await sql`SELECT nr_rating, rating FROM product WHERE product_id = ${productID}`;

    const rating = x[0].rating;
    const nr_rating = x[0].nr_rating;

    const avarageRatingATM = Number(rating);
    const totalRatings = Number(nr_rating);
    const newAvarageRating =
      (avarageRatingATM * totalRatings + userRating) / (totalRatings + 1);

    await sql`
    UPDATE product SET rating = ${newAvarageRating}, nr_rating = ${
      totalRatings + 1
    }
    WHERE product_id = ${productID}`;

    res
      .status(201)
      .json({ message: "Review added successfully", newAvarageRating });
  } catch (error) {
    next(error);
  }
};
