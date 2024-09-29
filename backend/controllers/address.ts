import { RequestHandler } from "express";
import { RowDataPacket } from "mysql2/promise";
import pool from "../models/db";

interface Address extends RowDataPacket {
  id: number;
  username: string;
  street: string;
  city: string;
  country: string;
  postal_code: string;
  state: string;
}

export const checkAddress: RequestHandler = async (req, res, next) => {
  const { username } = req.body;

  try {
    const query = "SELECT * FROM address WHERE client_username = ?";
    const [address] = await pool.query<Address[]>(query, [username]);

    if (address.length === 0) {
      return res
        .status(204)
        .json({ message: "No address found for this user" });
    }

    return res.status(200).json({ message: "Address found", address });
  } catch (error) {
    next(error);
  }
};

export const addAddress: RequestHandler = async (req, res, next) => {
  const { username, street, city, country, postal_code, state } = req.body;

  try {
    const checkQuery = "SELECT * FROM address WHERE client_username = ?";
    const [existingAddress] = await pool.query(checkQuery, [username]);

    if ((existingAddress as Address[]).length > 0) {
      return res.status(400).json({ message: "User already has an address" });
    }

    const insertQuery =
      "INSERT INTO address (client_username, street, city, state, country, postal_code, address_type) VALUES (?, ?, ?, ?, ?, ?, 'billing')";
    await pool.query(insertQuery, [
      username,
      street,
      city,
      country,
      postal_code,
      state,
    ]);

    return res.status(201).json({ message: "Address added successfully" });
  } catch (error) {
    next(error);
  }
};
