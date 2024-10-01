import { RequestHandler } from "express";
import sql from "../models/neon";

export const getReview: RequestHandler = async (req, res, next) => {
  try {
    const review =
      await sql` SELECT * FROM new_rating WHERE product_id = ${req.params.productID}`;
    res.status(200).json({
      review: review,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
