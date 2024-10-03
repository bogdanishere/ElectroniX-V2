import { RequestHandler } from "express";
import sql from "../../models/neon";
import bcrypt from "bcryptjs";

export const addProvider: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    await sql`
        INSERT INTO users (username, password, email, type) VALUES (${name}, ${hashedPassword}, ${email}, 'provider')`;

    await sql`INSERT INTO provider (username, company) VALUES (${name}, ${name})`;

    res.status(201).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
