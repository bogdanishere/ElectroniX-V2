import { RequestHandler } from "express";
import sql from "../models/neon";

export const searchFinishOrders: RequestHandler = async (req, res) => {
  const { username: clientUsername } = req.query;

  console.log("clientUsername:", clientUsername);

  if (!clientUsername) {
    return res.status(400).json({ message: "Client username is required" });
  }

  try {
    const order = await sql`
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
    FROM order_table o
    JOIN orderdetails od ON o.order_id = od.order_id
    JOIN product p ON od.product_id = p.product_id
    JOIN address a ON o.address_id = a.address_id
    WHERE o.client_username = ${clientUsername as string} `;

    return res.status(200).json({ orders: order, message: "Success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
