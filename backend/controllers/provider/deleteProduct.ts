import { RequestHandler } from "express";
import pool from "../../models/db";
import { ResultSetHeader } from "mysql2";

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const { productId } = req.params;
  const { username: prociderUsername } = req.query;
  try {
    if (!prociderUsername || !productId) {
      res.status(400).json({ message: "Please provide all required fields" });
      return;
    }

    const [request] = await pool.query<ResultSetHeader>(
      "DELETE FROM Product WHERE product_id = ? AND prices_merchant = ?",
      [productId, prociderUsername]
    );
    if (request.affectedRows === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product deleted", productId });
  } catch (error) {
    next(error);
  }
};
