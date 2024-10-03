import { RequestHandler } from "express";
import sql from "../models/neon";

type SortProps = "asc" | "desc" | "none";

export const searchProducts: RequestHandler = async (req, res, next) => {
  const { page, productName } = req.params as {
    page: string;
    productName: string;
  };

  let sort = req.query.sort as SortProps;

  if (!["asc", "desc", "none"].includes(sort)) sort = "none";

  const productsPerPage = 5;
  const offset = productsPerPage * (Number(page) - 1);

  try {
    const products = await sql`
      SELECT * FROM product
      WHERE
        lower(name) LIKE ${"%" + productName.toLowerCase() + "%"}
        OR lower(brand) LIKE ${"%" + productName.toLowerCase() + "%"}
        OR lower(categories) LIKE ${"%" + productName.toLowerCase() + "%"}
      ${sort !== "none" ? sql`ORDER BY price ${sql(sort)}` : sql``}
      LIMIT ${productsPerPage} OFFSET ${offset}
    `;

    return res.json({
      products: products,
      pageNumber: Number(page),
      itemsPerPage: productsPerPage,
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};
