import { RequestHandler } from "express";
import { prisma } from "../../models/neon";

export const deleteOrder: RequestHandler = async (req, res, next) => {
  const { orderDetailId } = req.params;
  const { username } = req.query;

  try {
    if (!orderDetailId || !username) {
      res.status(400).json({ message: "Please provide all required fields" });
      return;
    }

    const provider = await prisma.provider.findUnique({
      where: {
        username: username as string,
      },
    });

    if (!provider) {
      res.status(404).json({
        message: "Provider not found",
      });
      return;
    }

    await prisma.ordersProvider.delete({
      where: {
        orderProviderId: Number(orderDetailId),
      },
    });

    res.status(200).json({
      orderDetailId,
      message: "Order deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};
