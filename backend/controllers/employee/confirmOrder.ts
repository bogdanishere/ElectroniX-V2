import { RequestHandler } from "express";
import pool from "../../models/db";
import { RowDataPacket } from "mysql2";

export const confirmOrder: RequestHandler = async (req, res, next) => {
  const { orderId } = req.params;
  const { username } = req.query;

  if (!orderId || !username) {
    return res
      .status(400)
      .json({ message: "Order ID and username are required." });
  }

  const employeeExistsQuery = `
  select * from employee where username = ?
    `;

  const [employee] = await pool.query<RowDataPacket[]>(employeeExistsQuery, [
    username,
  ]);

  if (employee.length === 0) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const query = `
    UPDATE \`order\` 
    SET employee_approved = TRUE, employee_username = ? 
    WHERE order_id = ?
  `;

  try {
    const [result] = await pool.query<RowDataPacket[]>(query, [
      username,
      orderId,
    ]);

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Order not found or already confirmed." });
    }

    res.status(200).json({ message: "Order confirmed" });
  } catch (error) {
    console.error("Database error:", error);
    next(error);
  }
};
