import { RequestHandler } from "express";
import sql from "../../models/neon";

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const { productId } = req.params;
  const { username: providerUsername } = req.query;
  try {
    if (!providerUsername || !productId) {
      res.status(400).json({ message: "Please provide all required fields" });
      return;
    }

    const x =
      await sql`SELECT * from orderdetails where product_id = ${productId}`;

    if (x.length > 0) {
      res
        .status(400)
        .json({ message: "Product has a command, you cannot delete it" });
      return;
    }

    await sql`DELETE FROM new_rating WHERE product_id = ${productId}`;

    await sql`
      DELETE FROM product WHERE product_id = ${String(
        productId
      )} AND prices_merchant = ${providerUsername as string}`;

    res.status(200).json({ message: "Product deleted", productId });
  } catch (error) {
    next(error);
  }
};
