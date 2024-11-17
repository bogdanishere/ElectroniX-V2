import { RequestHandler } from "express";
import { prisma } from "../models/neon";

interface UserData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const checkExistentAccount: RequestHandler = async (req, res, next) => {
  const { username } = req.body as UserData;

  try {
    const users = await prisma.users.findMany({
      where: {
        username: username,
      },
    });

    if (users.length > 0) {
      return res
        .status(200)
        .json({ message: "Client already exists!", existent: true });
    } else {
      return res
        .status(200)
        .json({ message: "Client doesn't exist!", existent: false });
    }
  } catch (error) {
    next(error);
  }
};
