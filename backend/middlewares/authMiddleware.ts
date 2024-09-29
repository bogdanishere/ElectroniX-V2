import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../env";

const SECRET_KEY = env.JWT_SECRET;

interface JwtPayload {
  username: string;
  type: string;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Lipsește header-ul de autorizare" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Lipsește token-ul" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token invalid sau expirat" });
  }
};
