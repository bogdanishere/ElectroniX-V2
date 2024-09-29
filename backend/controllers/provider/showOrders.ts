import { RequestHandler } from "express";
import { RowDataPacket } from "mysql2";
import pool from "../../models/db";

export const showOrders: RequestHandler = async (req, res, next) => {
  try {
    const { username: providerUsername } = req.query;

    if (!providerUsername) {
      res.status(400).json({ message: "Provider username is required" });
      return;
    }

    const [provider] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM provider WHERE username = ?",
      [providerUsername]
    );

    if (provider.length === 0) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }

    const [orders] = await pool.query<RowDataPacket[]>(
      `
        SELECT 
          orderdetails.order_detail_id,
          orderdetails.order_id,
          orderdetails.product_id,
          orderdetails.quantity,
          product.name AS product_name,
          \`Order\`.date_created,
          \`Order\`.employee_approved,
          orderdetails.provider_username
        FROM 
          orderdetails
        JOIN 
          product ON orderdetails.product_id = product.product_id
        JOIN 
          \`Order\` ON orderdetails.order_id = \`Order\`.order_id
        WHERE 
          orderdetails.provider_approved = FALSE
          AND \`Order\`.employee_approved = TRUE
          AND orderdetails.provider_username = ?
      `,
      [providerUsername]
    );

    res.status(200).json({ orders, message: "Success" });
  } catch (error) {
    next(error);
  }
};
