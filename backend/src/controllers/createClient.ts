import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../../env";
import sql from "../models/neon";

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
    const users = await sql`SELECT * FROM users WHERE username = ${username}`;

    if (users.length > 0) {
      return res.status(429).json({ message: "Client already exists!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    await sql`INSERT INTO users (username, password, email, type) VALUES (${username}, ${hashedPassword}, ${email}, ${"client"})`;

    await sql`INSERT INTO client (username, first_name, last_name) VALUES (${username}, ${firstName}, ${lastName})`;

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
      image: null,
    });
  } catch (error) {
    next(error);
  }
};
