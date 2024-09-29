import { RequestHandler } from "express";
import pool from "../models/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface Address extends RowDataPacket {
  id: number;
}

export const addCommand: RequestHandler = async (req, res, next) => {
  const employeeUsername = "test_employee";
  const { clientUsername, products: modifyStructurePorduct } = req.body;

  const { products } = modifyStructurePorduct;

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "No products provided" });
  }

  try {
    const query = "SELECT address_id FROM address WHERE client_username = ?";
    const [address] = await pool.query<Address[]>(query, [clientUsername]);

    if (address.length === 0) {
      return res
        .status(404)
        .json({ message: "No address found for this user" });
    }

    const addressId = address[0].address_id;

    const query2 =
      "INSERT INTO `Order` (address_id, client_username, employee_username, employee_approved) VALUES (?, ? ,? ,?)";

    const [orderResult] = await pool.query(query2, [
      addressId,
      clientUsername,
      employeeUsername,
      false,
    ]);

    const orderId = (orderResult as ResultSetHeader).insertId;

    const query3 =
      "INSERT INTO OrderDetails (order_id, product_id, provider_username, quantity, provider_approved) VALUES (?, ?, ?, ?, ?)";

    for (const product of products) {
      const { productId, providerUsername, quantity } = product;

      await pool.query(query3, [
        orderId,
        productId,
        providerUsername,
        quantity,
        false,
      ]);
    }

    res.status(201).json({ message: "Command added successfully" });
  } catch (error) {
    next(error);
  }
};
