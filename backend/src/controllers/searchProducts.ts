import { RequestHandler } from "express";
import { prisma } from "../models/neon";

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
    const products = await prisma.products.findMany({
      where: {
        OR: [
          {
            name: {
              contains: productName,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: productName,
              mode: "insensitive",
            },
          },
          {
            categories: {
              contains: productName,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy:
        sort === "asc"
          ? { price: "asc" }
          : sort === "desc"
          ? { price: "desc" }
          : undefined,
      take: productsPerPage,
      skip: offset,
    });

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
