import { RequestHandler } from "express";
import sql from "../../models/neon";
import bcrypt from "bcryptjs";

export const addProvider: RequestHandler = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    console.log("name", name);
    console.log("email", email);
    const defaultPassword = "password_provider";
    const hashedPassword = bcrypt.hashSync(defaultPassword, 8);

    await sql`
        INSERT INTO users (username, password, email, type) VALUES (${name}, ${hashedPassword}, ${email}, 'provider')`;

    await sql`INSERT INTO provider (username, company) VALUES (${name}, ${name})`;

    res.status(201).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
