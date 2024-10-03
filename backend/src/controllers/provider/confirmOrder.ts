import { RequestHandler } from "express";
import { format } from "date-fns";
import sql from "../../models/neon";

export const confirmOrder: RequestHandler = async (req, res, next) => {
  const { orderDetailId } = req.params;
  const { username } = req.query;

  try {
    if (!orderDetailId || !username) {
      res.status(400).json({ message: "Please provide all required fields" });
      return;
    }

    const provider = await sql`
      SELECT * FROM provider WHERE username = ${username as string}
    `;

    if (provider.length === 0) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }

    const orders = await sql`
      SELECT * FROM orderdetails WHERE order_detail_id = ${
        orderDetailId as string
      }
    `;

    if (orders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const arrivalTime = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const formattedArrivalTime = format(arrivalTime, "yyyy-MM-dd HH:mm:ss");

    await sql`
      UPDATE orderdetails
      SET 
        provider_approved = TRUE,
        status = 'in_transit',
        arrival_time = ${formattedArrivalTime}
      WHERE 
        order_detail_id = ${orderDetailId}
        AND provider_username = ${username as string}
    `;

    const orderDetails = await sql`
      SELECT product_id, quantity 
      FROM orderdetails 
      WHERE order_detail_id = ${orderDetailId as string}
    `;

    const { product_id, quantity: ordered_quantity } = orderDetails[0];

    await sql`
      UPDATE product
      SET quantity = quantity - ${ordered_quantity}
      WHERE product_id = ${product_id}
    `;

    res.status(200).json({ message: "Order confirmed" });
  } catch (error) {
    next(error);
  }
};
