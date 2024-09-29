import { RequestHandler } from "express";
import pool from "../models/db";

export const getReview: RequestHandler = async (req, res, next) => {
  try {
    const query = "SELECT * FROM new_rating WHERE product_id = ?";
    const [review] = await pool.query(query, [req.params.productID]);
    res.status(200).json({
      review: review,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
