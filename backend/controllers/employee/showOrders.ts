import { RequestHandler } from "express";
import pool from "../../models/db";
import { RowDataPacket } from "mysql2";

interface OrderProps extends RowDataPacket {
  order_id: number;
  client_username: string;
  address_id: number;
  employee_username: string;
  data_created: string;
  employee_approved: boolean;
}

export const showOrders: RequestHandler = async (req, res) => {
  const { username } = req.query;

  const query =
    "select * from `order` where employee_approved = FALSE AND employee_username = ?";

  try {
    const [orders] = await pool.query<OrderProps[]>(query, [username]);

    res.status(200).json({ orders, message: "Success" });
  } catch (error) {
    res.status(500).json({ error, message: "Internal server error" });
  }
};
