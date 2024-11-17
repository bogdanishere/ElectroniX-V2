import { RequestHandler } from "express";
import bcrypt from "bcryptjs";

import { prisma } from "../../models/neon";

export const addEmployee: RequestHandler = async (req, res, next) => {
  try {
    const { username, name, email } = req.body;

    const defaultPassword = "password_employee";
    const userType = "EMPLOYEE";

    const hashedPassword = bcrypt.hashSync(defaultPassword, 8);

    await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        email,
        type: userType,
        imageProfile: "",
        employee: {
          create: {
            username,
            employeeName: name,
          },
        },
      },
    });

    res.status(201).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
