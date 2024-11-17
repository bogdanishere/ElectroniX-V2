import { RequestHandler } from "express";
import { prisma } from "../../models/neon";
import { put } from "@vercel/blob";

export const addProduct: RequestHandler = async (req, res, next) => {
  function generateCode(): string {
    const prefix = "AV";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = prefix;

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }

  const productId = generateCode();

  const featuredImage = req.file;
  const {
    price,
    currency,
    weight,
    productName: name,
    brand,
    quantity,
    categories,
    description,
  } = req.body;

  const providerUsername = req.body.username || req.query.username;

  console.log(providerUsername);
  if (
    !price ||
    !currency ||
    !weight ||
    !name ||
    !brand ||
    !quantity ||
    !categories ||
    !description ||
    !providerUsername
  ) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  if (!featuredImage) {
    return res.status(400).json({
      message: "Please provide a featured image",
    });
  }

  const featureImageUploadPath = "/uploads/products/" + productId + ".png";

  const blob = await put(featureImageUploadPath, featuredImage.buffer, {
    contentType: "image/png",
    access: "public",
  });

  try {
    const provider = await prisma.provider.findUnique({
      where: {
        username: providerUsername,
      },
    });

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    await prisma.products.create({
      data: {
        productId: productId,
        name,
        price: parseFloat(price),
        currency,
        weight,
        brand,
        quantity: parseInt(quantity),
        pricesAvailability: "IN_STOCK",
        categories,
        dateAdded: new Date().toISOString(),
        dateUpdated: new Date().toISOString(),
        imageUrls: blob.url,
        rating: 0,
        nrOfRatings: 0,
        description,
        quality: 1,
        provider: {
          connect: {
            username: providerUsername,
          },
        },
      },
    });

    res.status(200).json({
      message: "Product added successfully",
      productId,
    });
  } catch (error) {
    next(error);
  }
};
