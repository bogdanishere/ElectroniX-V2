import { RequestHandler } from "express";
import pool from "../models/db";
import { RowDataPacket } from "mysql2";

interface OrderProps extends RowDataPacket {
  order_id: number;
  client_username: string;
  date_created: string;
  employee_approved: boolean;
  quantity: number;
  product_id: string;
  product_name: string;
  brand: string;
  price: string;
  currency: string;
  imageURLs: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  address_type: string;
  provider_approved: boolean;
  employee_username: string;
  status: string;
  arrival_time: string | null;
}

export const searchFinishOrders: RequestHandler = async (req, res) => {
  const { username: clientUsername } = req.query;

  if (!clientUsername) {
    return res.status(400).json({ message: "Client username is required" });
  }

  const query = `
      SELECT 
        o.client_username, 
        o.date_created, 
        o.employee_approved,
        od.quantity, 
        p.product_id, 
        p.name AS product_name, 
        p.brand, 
        p.price, 
        p.currency, 
        od.provider_approved,
        o.employee_username,
        od.status,
        CASE
          WHEN od.status != 'in pregatire' THEN od.arrival_time
          ELSE NULL
        END AS arrival_time
      FROM \`order\` o
      JOIN \`orderdetails\` od ON o.order_id = od.order_id
      JOIN \`product\` p ON od.product_id = p.product_id
      JOIN \`address\` a ON o.address_id = a.address_id
      WHERE o.client_username = ?
    `;

  try {
    const [order] = await pool.query<OrderProps[]>(query, [clientUsername]);

    return res.status(200).json({ orders: order, message: "Success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
