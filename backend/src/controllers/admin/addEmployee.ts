import { RequestHandler } from "express";
import sql from "../../models/neon";
import bcrypt from "bcryptjs";

export const addEmployee: RequestHandler = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const defaultPassword = "password_employee";
    const userType = "employee";

    const hashedPassword = bcrypt.hashSync(defaultPassword, 8);

    await sql`
      INSERT INTO users (username, password, email, type)
      VALUES (${name}, ${hashedPassword}, ${email}, ${userType})
    `;

    await sql`
      INSERT INTO employee (username, employee_name)
      VALUES (${name}, ${name})
    `;

    res.status(201).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
