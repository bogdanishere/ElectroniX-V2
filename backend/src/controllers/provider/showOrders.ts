import { RequestHandler } from "express";
import { prisma } from "../../models/neon";
export const showOrders: RequestHandler = async (req, res, next) => {
  try {
    const { username: providerUsername } = req.query;

    if (!providerUsername) {
      res.status(400).json({ message: "Provider username is required" });
      return;
    }

    const provider = await prisma.provider.findUnique({
      where: {
        username: providerUsername as string,
      },
    });

    if (!provider) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }

    const orders = await prisma.ordersProvider.findMany({
      where: {
        providerUsername: providerUsername as string,
        providerApproved: false,
        ordersEmployee: {
          employeeApproved: true,
        },
      },
      include: {
        ordersEmployee: {
          select: {
            employeeApproved: true,
            employeeUsername: true,
          },
        },
        product: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(200).json({ orders: orders, message: "Success" });
  } catch (error) {
    next(error);
  }
};
