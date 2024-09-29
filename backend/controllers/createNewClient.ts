import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../models/db";
import env from "../env";

interface UserData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

const SECRET_KEY = env.JWT_SECRET;

export const createNewClient: RequestHandler = async (req, res, next) => {
  const { username, password, email, firstName, lastName } =
    req.body as UserData;

  try {
    const [rows] = await pool.query("SELECT * FROM User WHERE username = ?", [
      username,
    ]);

    if ((rows as unknown[]).length > 0) {
      return res.status(400).json({ message: "Client already exists!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    await pool.query(
      "INSERT INTO User (username, password, email, type) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, email, "client"]
    );

    await pool.query(
      "INSERT INTO Client (username, first_name, last_name) VALUES (?, ?, ?)",
      [username, firstName, lastName]
    );

    const token = jwt.sign(
      {
        username: username,
        type: "client",
      },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Client added successfully!",
      user: username,
      token,
    });
  } catch (error) {
    next(error);
  }
};
