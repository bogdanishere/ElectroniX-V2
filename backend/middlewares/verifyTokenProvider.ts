import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../env";

const SECRET_KEY = env.JWT_SECRET;

interface DecodedToken {
  username: string;
  type: "client" | "employee" | "provider";
  iat: number;
  exp: number;
}

export const verifyProviderToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  const username = req.body.username || req.query.username;

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    const decodedToken = decoded as DecodedToken;

    if (
      decodedToken.type === "provider" &&
      decodedToken.username === username
    ) {
      // @ts-expect-error Property 'user' does exist on type 'Request'.
      req.user = decodedToken;
      next();
    } else {
      return res.status(403).json({ message: "Access restricted" });
    }
  });
};
