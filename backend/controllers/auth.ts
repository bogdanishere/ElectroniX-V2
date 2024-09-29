import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../models/db";
import env from "../env";

const SECRET_KEY = env.JWT_SECRET;

interface User {
  username: string;
  password: string;
  type: string;
}

export const loginClient: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are mandatory" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT username, password, type FROM User WHERE email = ?",
      [email]
    );

    if ((rows as unknown[]).length === 0) {
      return res.status(404).json({ error: "Utilizatorul nu există!" });
    }

    const user = (rows as User[])[0];

    if (user) {
      const isPasswordMatch = bcrypt.compareSync(password, user.password);

      if (isPasswordMatch) {
        const token = jwt.sign(
          {
            username: user.username,
            type: user.type,
          },
          SECRET_KEY,
          { expiresIn: "24h" }
        );

        return res.json({
          type: user.type,
          user: user.username,
          token,
        });
      } else {
        return res.status(401).json({ error: "Parolă greșită!" });
      }
    }
  } catch (error) {
    next(error);
  }
};
