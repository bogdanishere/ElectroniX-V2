import { RequestHandler } from "express";
import { prisma } from "../models/neon";

export const checkAddress: RequestHandler = async (req, res, next) => {
  const { username } = req.body;

  try {
    const address = await prisma.address.findMany({
      where: {
        clientUsername: username,
      },
    });

    if (address.length === 0) {
      return res
        .status(200)
        .json({ message: "No address found for this user" });
    }

    return res.status(200).json({ message: "Address found", address });
  } catch (error) {
    next(error);
  }
};

export const addAddress: RequestHandler = async (req, res, next) => {
  const { username, street, city, country, postal_code } = req.body;

  try {
    const existingAddress = await prisma.address.findMany({
      where: {
        clientUsername: username,
      },
    });

    if (existingAddress.length > 0) {
      return res.status(400).json({ message: "User already has an address" });
    }

    await prisma.address.create({
      data: {
        clientUsername: username,
        street,
        city,
        country,
        postalCode: postal_code,
        addressType: "BILLING",
      },
    });

    return res.status(201).json({ message: "Address added successfully" });
  } catch (error) {
    next(error);
  }
};
