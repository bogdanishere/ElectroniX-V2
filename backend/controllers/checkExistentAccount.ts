import { RequestHandler } from "express";
import pool from "../models/db";

interface UserData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const checkExistentAccount: RequestHandler = async (req, res, next) => {
  const { username } = req.body as UserData;

  try {
    const [rows] = await pool.query("SELECT * FROM User WHERE username = ?", [
      username,
    ]);

    if ((rows as unknown[]).length > 0) {
      return res
        .status(200)
        .json({ message: "Client already exists!", existent: true });
    } else {
      return res
        .status(200)
        .json({ message: "Client doesn't exist!", existent: false });
    }
  } catch (error) {
    next(error);
  }
};
