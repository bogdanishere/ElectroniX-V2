import { RequestHandler } from "express";
import { prisma } from "../../models/neon";

export const showOrders: RequestHandler = async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const orders = await prisma.ordersEmployee.findMany({
      where: {
        employeeApproved: false,
        employeeUsername: username as string,
      },
    });

    res.status(200).json({ orders: orders, message: "Success" });
  } catch (error) {
    res.status(500).json({ error, message: "Internal server error" });
  }
};
