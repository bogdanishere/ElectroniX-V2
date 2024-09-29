import { RequestHandler } from "express";
import pool from "../models/db";
import { RowDataPacket } from "mysql2";

interface ProductProps extends RowDataPacket {
  nr_rating: number;
  rating: number;
}

export const addReview: RequestHandler = async (req, res, next) => {
  try {
    const {
      productID,
      title,
      review,
      username: clientUsername,
      rating,
    } = req.body;

    const [productIfExist] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM product WHERE product_id = ?",
      [productID]
    );

    if (productIfExist.length === 0)
      res.status(404).json({ message: "Product not found" });

    const query =
      "INSERT INTO new_rating (product_id, title, review, client_username, rating) VALUES (?, ?, ?, ?, ?)";
    await pool.query(query, [productID, title, review, clientUsername, rating]);

    const [rows] = await pool.query<ProductProps[]>(
      "SELECT nr_rating, rating FROM product WHERE product_id = ?",
      [productID]
    );

    const product = rows[0];

    const avarageRatingATM = product.rating;
    const totalRatings = product.nr_rating;
    const newAvarageRating =
      (avarageRatingATM * totalRatings + rating) / (totalRatings + 1);

    await pool.query(
      "UPDATE product SET rating = ?, nr_rating = ? WHERE product_id = ?",
      [newAvarageRating, totalRatings + 1, productID]
    );

    res.status(201).json({ message: "Review added successfully", product });
  } catch (error) {
    next(error);
  }
};
