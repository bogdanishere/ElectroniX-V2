import { RequestHandler } from "express";
import sql from "../../models/neon";

export const deleteOrder: RequestHandler = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    await sql`DELETE FROM orderdetails WHERE order_id = ${orderId}`;

    await sql`DELETE FROM order_table WHERE order_id = ${orderId}`;

    return res.status(200).json({
      orderId,
      message: "Comanda a fost ștearsă cu succes!",
    });
  } catch (error) {
    next(error);
  }
};
