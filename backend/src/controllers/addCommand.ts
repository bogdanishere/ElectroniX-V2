import { RequestHandler } from "express";
import { prisma } from "../models/neon";

export const addCommand: RequestHandler = async (req, res, next) => {
  const employeeUsername = "admin";
  const { clientUsername, products: modifyStructureProduct } = req.body;

  const { products } = modifyStructureProduct;

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "No products provided" });
  }

  try {
    // const addressResult = await sql`
    //   SELECT address_id
    //   FROM address
    //   WHERE client_username = ${clientUsername}
    // `;

    const addressResult = await prisma.address.findFirst({
      where: {
        clientUsername: clientUsername,
      },
      select: {
        addressId: true,
      },
    });

    // if (addressResult.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ message: "No address found for this user" });
    // }

    if (!addressResult) {
      return res
        .status(404)
        .json({ message: "No address found for this user" });
    }

    // const addressId = addressResult[0].address_id;

    // const insertOrderResult = await sql`
    //   INSERT INTO order_table (
    //     address_id,
    //     client_username,
    //     employee_username,
    //     employee_approved
    //   )
    //   VALUES (
    //     ${addressId},
    //     ${clientUsername},
    //     ${employeeUsername},
    //     false
    //   )
    //   RETURNING order_id
    // `;

    const insertOrderResult = await prisma.ordersEmployee.create({
      data: {
        addressId: addressResult?.addressId,
        clientUsername: clientUsername,
        employeeUsername: employeeUsername,
        employeeApproved: false,
        dateCreated: new Date(),
      },
      select: {
        orderEmployeeId: true,
      },
    });

    // if (insertOrderResult.length === 0) {
    //   return res.status(500).json({ message: "Failed to create order" });
    // }

    // const orderId = insertOrderResult[0].order_id;

    if (!insertOrderResult) {
      return res.status(500).json({ message: "Failed to create order" });
    }

    for (const product of products) {
      const { productId, providerUsername, quantity } = product;

      // const status = "preparing";

      // await sql`
      //   INSERT INTO orderdetails (
      //     order_id,
      //     product_id,
      //     provider_username,
      //     quantity,
      //     provider_approved,
      //     status
      //   )
      //   VALUES (
      //     ${orderId},
      //     ${productId},
      //     ${providerUsername},
      //     ${quantity},
      //     false,
      //     ${status}
      //   )
      // `;

      await prisma.ordersProvider.create({
        data: {
          orderEmployeeId: insertOrderResult.orderEmployeeId,
          productId: productId,
          providerUsername: providerUsername,
          quantity: quantity,
          providerApproved: false,
          status: "PREPARING",
          arrivalDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        },
      });
    }

    res.status(201).json({ message: "Command added successfully" });
  } catch (error) {
    next(error);
  }
};
