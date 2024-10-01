import { RequestHandler } from "express";
import sql from "../../models/neon";

export const confirmOrder: RequestHandler = async (req, res, next) => {
  const { orderId } = req.params;
  const { username } = req.query;

  if (!orderId || !username) {
    return res
      .status(400)
      .json({ message: "Order ID and username are required." });
  }

  const employee = await sql`
    SELECT * FROM employee where username = ${username as string}`;

  if (employee.length === 0) {
    return res.status(404).json({ message: "Employee not found" });
  }

  try {
    await sql` UPDATE order_table
    SET employee_approved = TRUE, employee_username = ${username as string}
    WHERE order_id = ${orderId}
    `;

    res.status(200).json({ message: "Order confirmed" });
  } catch (error) {
    console.error("Database error:", error);
    next(error);
  }
};
