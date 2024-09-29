import { RequestHandler } from "express";
import pool from "../../models/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const deleteOrder: RequestHandler = async (req, res, next) => {
  const { orderDetailId } = req.params;
  const { username } = req.query;

  try {
    if (!orderDetailId || !username) {
      res.status(400).json({ message: "Please provide all required fields" });
      return;
    }

    const [provider] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM provider WHERE username = ?",
      [username]
    );

    if (provider.length === 0) {
      res.status(404).json({
        message: "Provider not found",
      });
      return;
    }

    const [deleteConfirmation] = await pool.query<ResultSetHeader>(
      "DELETE FROM orderdetails WHERE order_detail_id = ? AND provider_username = ?",
      [orderDetailId, username]
    );

    if (deleteConfirmation.affectedRows === 0) {
      res.status(404).json({
        message: "No order found to be deleted.",
      });
      return;
    }

    res.status(200).json({
      orderDetailId,
      message: "Order deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};
