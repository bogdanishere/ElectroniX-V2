import { RequestHandler } from "express";
import { prisma } from "../../models/neon";

export const deleteOrder: RequestHandler = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    await prisma.ordersEmployee.delete({
      where: {
        orderEmployeeId: +orderId,
      },
    });

    return res.status(200).json({
      orderId,
      message: "Comanda a fost ștearsă cu succes!",
    });
  } catch (error) {
    next(error);
  }
};
