import { RequestHandler } from "express";
import sql from "../../models/neon";
import bcrypt from "bcryptjs";

export const addProvider: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide name, email and password",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const existUser =
      await sql`SELECT * FROM users WHERE username = ${name} AND email = ${email}`;

    if (existUser.length > 0) {
      return res
        .status(409)
        .json({ status: "error", message: "User already exists" });
    }

    await sql`
        INSERT INTO users (username, password, email, type) VALUES (${name}, ${hashedPassword}, ${email}, 'provider')`;

    await sql`INSERT INTO provider (username, company) VALUES (${name}, ${name})`;

    res.status(201).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
