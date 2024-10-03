import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../../env";
import sql from "../models/neon";

const SECRET_KEY = env.JWT_SECRET;

interface User {
  username: string;
  password: string;
  type: string;
  image_profile: string;
}

export const loginClient: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are mandatory" });
  }

  try {
    const user = await sql<
      User[]
    >` SELECT username, password, type, image_profile FROM users WHERE email = ${email}`;

    if (user.length === 0 || !user) {
      return res.status(404).json({ error: "Utilizatorul nu există!" });
    }

    if (user) {
      const isPasswordMatch = bcrypt.compareSync(password, user[0].password);

      if (isPasswordMatch) {
        const token = jwt.sign(
          {
            username: user[0].username,
            type: user[0].type,
          },
          SECRET_KEY,
          { expiresIn: "24h" }
        );

        return res.json({
          type: user[0].type,
          user: user[0].username,
          token,
          image: user[0].image_profile,
        });
      } else {
        return res.status(401).json({ error: "Parolă greșită!" });
      }
    }
  } catch (error) {
    next(error);
  }
};
