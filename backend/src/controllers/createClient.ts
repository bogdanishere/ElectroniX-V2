import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../../env";

import { prisma } from "../models/neon";

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
    if (!username || !password || !email || !firstName || !lastName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const findUser = await prisma.users.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (findUser) {
      return res.status(409).json({ message: "Client already exists!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        email,
        type: "CLIENT",
        imageProfile: "",
        client: {
          create: {
            username,
            firstName,
            lastName,
          },
        },
      },
      select: {
        username: true,
        email: true,
        imageProfile: true,
        type: true,
      },
    });

    console.log("test: ", newUser);

    const token = jwt.sign(
      {
        username: newUser.username,
        type: newUser.type,
      },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Client added successfully!",
      user: newUser.username,
      token,
      image: newUser.imageProfile,
    });
  } catch (error) {
    next(error);
  }
};
