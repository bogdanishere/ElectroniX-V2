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
    let products;
    if (sort === "none") {
      products = await sql`
        SELECT * FROM product WHERE
        lower(name) LIKE ${"%" + productName.toLowerCase() + "%"}
        OR lower(brand) LIKE ${"%" + productName.toLowerCase() + "%"}
        OR lower(categories) LIKE ${"%" + productName.toLowerCase() + "%"}
        LIMIT ${productsPerPage} OFFSET ${offset}
      `;
    } else if (sort === "asc") {
      products = await sql`
        SELECT * FROM product WHERE
        lower(name) LIKE ${"%" + productName.toLowerCase() + "%"}
        OR lower(brand) LIKE ${"%" + productName.toLowerCase() + "%"}
        OR lower(categories) LIKE ${"%" + productName.toLowerCase() + "%"}
        ORDER BY price asc
        LIMIT ${productsPerPage} OFFSET ${offset}
      `;
    } else {
      products = await sql`
        SELECT * FROM product WHERE
        lower(name) LIKE ${"%" + productName.toLowerCase() + "%"}
        OR lower(brand) LIKE ${"%" + productName.toLowerCase() + "%"}
        OR lower(categories) LIKE ${"%" + productName.toLowerCase() + "%"}
        ORDER BY price desc
        LIMIT ${productsPerPage} OFFSET ${offset}
      `;
    }

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
