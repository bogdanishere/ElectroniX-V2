import { RequestHandler } from "express";
import sql from "../models/neon";

export const checkAddress: RequestHandler = async (req, res, next) => {
  const { username } = req.body;

  try {
    const address =
      await sql`SELECT * FROM address WHERE client_username = ${username}`;

    console.log("address", address.length === 0);

    console.log("address", address);

    if (address.length === 0) {
      return res
        .status(200)
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
    const existingAddress =
      await sql`SELECT * FROM address WHERE client_username = ${username}`;

    if (existingAddress.length > 0) {
      return res.status(400).json({ message: "User already has an address" });
    }

    await sql`INSERT INTO address (client_username, street, city, state,
     country, postal_code, address_type) VALUES (${username},
      ${street}, ${city}, ${state}, ${country}, ${postal_code}, 'billing')`;

    return res.status(201).json({ message: "Address added successfully" });
  } catch (error) {
    next(error);
  }
};
