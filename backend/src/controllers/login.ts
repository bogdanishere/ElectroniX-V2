import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../../env";

import { prisma } from "../models/neon";

const SECRET_KEY = env.JWT_SECRET;

export const loginClient: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are mandatory" });
  }

  try {
    const userPrisma = await prisma.users.findFirst({
      where: {
        email: email,
      },
      select: {
        username: true,
        password: true,
        type: true,
        imageProfile: true,
      },
    });

    if (!userPrisma) {
      return res.status(404).json({ error: "Utilizatorul nu există!" });
    }

    if (userPrisma) {
      const isPasswordMatch = bcrypt.compareSync(password, userPrisma.password);

      if (isPasswordMatch) {
        const token = jwt.sign(
          {
            username: userPrisma.username,
            type: userPrisma.type,
          },
          SECRET_KEY,
          { expiresIn: "24h" }
        );

        return res.json({
          type: userPrisma.type,
          user: userPrisma.username,
          token,
          image: userPrisma.imageProfile,
        });
      } else {
        return res.status(401).json({ error: "Parolă greșită!" });
      }
    }
  } catch (error) {
    next(error);
  }
};
