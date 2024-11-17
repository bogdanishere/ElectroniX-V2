import { RequestHandler } from "express";
import { prisma } from "../../models/neon";
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

    const existUser = await prisma.users.findMany({
      where: {
        username: name,
        email: email,
      },
    });

    if (existUser.length > 0) {
      return res
        .status(409)
        .json({ status: "error", message: "User already exists" });
    }

    await prisma.users.create({
      data: {
        username: name,
        password: hashedPassword,
        email: email,
        type: "PROVIDER",
        imageProfile: "",
        provider: {
          create: {
            username: name,
            company: name,
          },
        },
      },
    });

    res.status(201).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
