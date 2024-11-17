import { RequestHandler } from "express";
import { prisma } from "../models/neon";

interface OrderProp {
  orderEmployeeId: number;
  orderProviderId: number;
  productId: string;
  quantity: number;
  name: string;
  price: number;
  currency: string;
  status: string;
  arrivalDate: string | null;
}

export const searchFinishOrders: RequestHandler = async (req, res, next) => {
  const { username: clientUsername } = req.query;

  if (!clientUsername) {
    return res.status(400).json({ message: "Client username is required" });
  }

  try {
    const ordersEmployee = await prisma.ordersEmployee.findMany({
      where: {
        clientUsername: clientUsername as string,
      },
      select: {
        orderEmployeeId: true,
        ordersProvider: {
          select: {
            orderProviderId: true,
            productId: true,
            quantity: true,
            status: true,
            arrivalDate: true,
          },
        },
      },
    });

    const productIds = new Set<string>();
    for (const orderEmployee of ordersEmployee) {
      for (const orderProvider of orderEmployee.ordersProvider) {
        productIds.add(orderProvider.productId);
      }
    }

    const products = await prisma.products.findMany({
      where: {
        productId: {
          in: Array.from(productIds),
        },
      },
      select: {
        productId: true,
        name: true,
        price: true,
        currency: true,
      },
    });

    const productMap = new Map<
      string,
      { name: string; price: number; currency: string }
    >();
    for (const product of products) {
      productMap.set(product.productId, {
        name: product.name,
        price: product.price,
        currency: product.currency,
      });
    }

    const ordersProp: OrderProp[] = [];

    for (const orderEmployee of ordersEmployee) {
      const { orderEmployeeId, ordersProvider } = orderEmployee;

      for (const orderProvider of ordersProvider) {
        const product = productMap.get(orderProvider.productId);

        if (product) {
          const orderData: OrderProp = {
            orderEmployeeId: orderEmployeeId,
            orderProviderId: orderProvider.orderProviderId,
            productId: orderProvider.productId,
            quantity: orderProvider.quantity,
            name: product.name,
            price: product.price,
            currency: product.currency,
            status: orderProvider.status,
            arrivalDate: orderProvider.arrivalDate
              ? orderProvider.arrivalDate.toISOString()
              : null,
          };

          ordersProp.push(orderData);
        } else {
          console.warn(`Product with ID ${orderProvider.productId} not found.`);
        }
      }
    }

    console.log(ordersProp);

    return res.status(200).json({ orders: ordersProp, message: "Success" });
  } catch (err) {
    next(err);
  }
};
