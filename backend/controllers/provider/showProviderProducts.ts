import { RequestHandler } from "express";
import { RowDataPacket } from "mysql2";
import pool from "../../models/db";

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
    const [provider] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM provider WHERE username = ?",
      [providerUsername]
    );

    if (provider.length === 0) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }

    const offset = (parseInt(page) - 1) * limit;

    const [products] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM Product WHERE prices_merchant = ? ORDER BY dateAdded DESC LIMIT ?, ?`,
      [providerUsername, offset, limit]
    );

    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};
