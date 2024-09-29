import { RequestHandler } from "express";
import { format } from "date-fns";
import pool from "../../models/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const confirmOrder: RequestHandler = async (req, res, next) => {
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

    const [orders] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM OrderDetails WHERE order_detail_id = ?`,
      [orderDetailId]
    );

    if (orders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (provider.length === 0) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }

    const arrivalTime = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const formattedArrivalTime = format(arrivalTime, "yyyy-MM-dd HH:mm:ss");

    const updateQuery = `
          UPDATE OrderDetails 
          SET provider_approved = ?, status = 'in drum spre dumneavoastra', arrival_time = ? 
          WHERE order_detail_id = ? AND provider_username = ?
        `;

    await pool.query(updateQuery, [
      true,
      formattedArrivalTime,
      orderDetailId,
      username,
    ]);

    const [orderDetails] = await pool.query<RowDataPacket[]>(
      "SELECT product_id, quantity FROM OrderDetails WHERE order_detail_id = ?",
      [orderDetailId]
    );

    const { product_id, quantity: ordered_quantity } = orderDetails[0];

    const updateProductQuery = `
      UPDATE Product 
      SET quantity = quantity - ? 
      WHERE product_id = ?
    `;
    const [updateProductResult] = await pool.query<ResultSetHeader>(
      updateProductQuery,
      [ordered_quantity, product_id]
    );

    if (updateProductResult.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Produsul nu a fost găsit pentru a fi actualizat." });
    }

    res.status(200).json({ message: "Order confirmed" });
  } catch (error) {
    next(error);
  }
};
