import { RequestHandler } from "express";
import sql from "../../models/neon";

export const showProviderProducts: RequestHandler = async (req, res, next) => {
  const { username: providerUsername } = req.query;
  const { page } = req.params;
  const limit = 5;

  if (!providerUsername || !page) {
    res
      .status(400)
      .json({ message: "Provider username and page are required" });
    return;
  }

  try {
    const provider = await sql`
      SELECT * FROM provider where username = ${providerUsername as string}
    `;

    if (provider.length === 0) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }

    const offset = (parseInt(page) - 1) * limit;

    const products = await sql`
      SELECT * FROM product WHERE prices_merchant = ${
        providerUsername as string
      } ORDER BY dateAdded DESC LIMIT ${limit} OFFSET ${offset}
    `;

    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};
