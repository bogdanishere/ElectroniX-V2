import { RequestHandler } from "express";
import sql from "../../models/neon";

export const deleteOrder: RequestHandler = async (req, res, next) => {
  const { orderDetailId } = req.params;
  const { username } = req.query;

  try {
    if (!orderDetailId || !username) {
      res.status(400).json({ message: "Please provide all required fields" });
      return;
    }

    const provider = await sql`
      SELECT * FROM provider where username = ${username as string}
    `;

    if (provider.length === 0) {
      res.status(404).json({
        message: "Provider not found",
      });
      return;
    }

    await sql`
      DELETE FROM orderdetails WHERE order_detail_id = ${
        String(orderDetailId) as string
      } AND provider_username = ${username as string}
    `;

    res.status(200).json({
      orderDetailId,
      message: "Order deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};
