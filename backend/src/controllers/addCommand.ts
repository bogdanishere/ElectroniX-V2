import { RequestHandler } from "express";
import sql from "../models/neon";

export const addCommand: RequestHandler = async (req, res, next) => {
  const employeeUsername = "admin";
  const { clientUsername, products: modifyStructureProduct } = req.body;

  const { products } = modifyStructureProduct;

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "No products provided" });
  }

  try {
    const addressResult = await sql`
      SELECT address_id 
      FROM address 
      WHERE client_username = ${clientUsername}
    `;

    if (addressResult.length === 0) {
      return res
        .status(404)
        .json({ message: "No address found for this user" });
    }

    const addressId = addressResult[0].address_id;

    const insertOrderResult = await sql`
      INSERT INTO order_table (
        address_id, 
        client_username, 
        employee_username, 
        employee_approved
      ) 
      VALUES (
        ${addressId}, 
        ${clientUsername}, 
        ${employeeUsername}, 
        false
      ) 
      RETURNING order_id
    `;

    if (insertOrderResult.length === 0) {
      return res.status(500).json({ message: "Failed to create order" });
    }

    const orderId = insertOrderResult[0].order_id;

    for (const product of products) {
      const { productId, providerUsername, quantity } = product;

      const status = "preparing";

      await sql`
        INSERT INTO orderdetails (
          order_id, 
          product_id, 
          provider_username, 
          quantity, 
          provider_approved, 
          status
        )
        VALUES (
          ${orderId}, 
          ${productId}, 
          ${providerUsername}, 
          ${quantity}, 
          false, 
          ${status}
        )
      `;
    }

    res.status(201).json({ message: "Command added successfully" });
  } catch (error) {
    next(error);
  }
};
