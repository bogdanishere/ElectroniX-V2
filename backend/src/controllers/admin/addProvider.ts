import { RequestHandler } from "express";
import { prisma } from "../../models/neon";
import bcrypt from "bcryptjs";

export const addProvider: RequestHandler = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const defaultPassword = "password_provider";
    const hashedPassword = bcrypt.hashSync(defaultPassword, 8);

    const userExists = await prisma.users.findMany({
      where: {
        username: name,
      },
    });
    if (userExists[0]) {
      return res.status(400).json({ error: "User already exists" });
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
            company: email,
          },
        },
      },
    });

    res.status(201).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
