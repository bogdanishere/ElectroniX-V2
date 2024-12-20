import { RequestHandler } from "express";
import { prisma } from "../../models/neon";

export const confirmOrder: RequestHandler = async (req, res, next) => {
  const { orderId } = req.params;
  const { username } = req.query;

  if (!orderId || !username) {
    return res
      .status(400)
      .json({ message: "Order ID and username are required." });
  }

  const employee = await prisma.employee.findUnique({
    where: {
      username: username as string,
    },
  });

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  try {
    await prisma.ordersEmployee.update({
      where: {
        orderEmployeeId: Number(orderId),
      },
      data: {
        employeeApproved: true,
        employeeUsername: username as string,
      },
    });

    res.status(200).json({ message: "Order confirmed" });
  } catch (error) {
    console.error("Database error:", error);
    next(error);
  }
};
