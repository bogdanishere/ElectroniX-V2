import { RequestHandler } from "express";
// import { format } from "date-fns"; // You can remove this import if not used elsewhere
import { prisma } from "../../models/neon";

export const confirmOrder: RequestHandler = async (req, res, next) => {
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
      res.status(404).json({ message: "Provider not found" });
      return;
    }

    const orderProvider = await prisma.ordersProvider.findFirst({
      where: {
        orderProviderId: Number(orderDetailId),
        providerUsername: username as string,
      },
    });

    if (!orderProvider) {
      return res.status(404).json({ message: "Order not found" });
    }

    const arrivalTime = new Date(Date.now() + 2 * 60 * 60 * 1000);

    await prisma.ordersProvider.update({
      where: {
        orderProviderId: Number(orderDetailId),
      },
      data: {
        providerApproved: true,
        status: "IN_TRANSIT",
        arrivalDate: arrivalTime,
      },
    });

    const productId = await prisma.ordersProvider.findUnique({
      where: {
        orderProviderId: Number(orderDetailId),
      },
      select: {
        productId: true,
      },
    });

    if (!productId) {
      return res.status(404).json({ message: "Product not found" });
    }

    await prisma.products.update({
      where: {
        productId: productId.productId.toString(),
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });

    res.status(200).json({ message: "Order confirmed" });
  } catch (error) {
    next(error);
  }
};
