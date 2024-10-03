import { RequestHandler } from "express";
import sql from "../../models/neon";
export const showOrders: RequestHandler = async (req, res, next) => {
  try {
    const { username: providerUsername } = req.query;

    if (!providerUsername) {
      res.status(400).json({ message: "Provider username is required" });
      return;
    }

    const provider = await sql`
      SELECT * FROM provider WHERE username = ${providerUsername as string}
    `;

    if (provider.length === 0) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }

    const orders = await sql`
  SELECT 
    orderdetails.order_detail_id,
    orderdetails.order_id,
    orderdetails.product_id,
    orderdetails.quantity,
    product.name AS product_name,
    order_table.date_created,
    order_table.employee_approved,
    orderdetails.provider_username
  FROM 
    orderdetails
  JOIN 
    product ON orderdetails.product_id = product.product_id
  JOIN 
    order_table ON orderdetails.order_id = order_table.order_id
  WHERE 
    orderdetails.provider_approved = FALSE
    AND order_table.employee_approved = TRUE
    AND orderdetails.provider_username = ${providerUsername as string}
`;

    res.status(200).json({ orders: orders, message: "Success" });
  } catch (error) {
    next(error);
  }
};
