import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import env from "../env";

import products from "./routes/products";
import authentification from "./routes/authentification";
import search from "./routes/search";
import review from "./routes/review";
import order from "./routes/order";
import address from "./routes/userRoutes";
import payment from "./routes/payment";
import command from "./routes/command";
import employee from "./routes/employee/employee";
import provider from "./routes/provider/provider";
import updateProfile from "./routes/updateImageProfile";

import { verifyClientToken } from "./middlewares/verifyToken";
import { verifySessionStripe } from "./middlewares/verifySessionStripe";

import createHttpError from "http-errors";
import { verifyEmployeeToken } from "./middlewares/verifyTokenEmployee";
import { verifyProviderToken } from "./middlewares/verifyTokenProvider";
import { verifyTokenUsers } from "./middlewares/verifyTokenUsers";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server" });
});

app.use("/auth", authentification);
app.use("/products", products);
app.use("/review", review);
app.use("/address", verifyClientToken, address);
app.use("/payment", verifyClientToken, payment);
app.use("/command", verifyClientToken, verifySessionStripe, command);
app.use("/search", search);

app.use("/order", verifyClientToken, order);

app.use("/employee", verifyEmployeeToken, employee);

app.use("/provider", verifyProviderToken, provider);

app.use("/update", verifyTokenUsers, updateProfile);

app.use("/uploads/products", express.static("uploads/products"));

app.use("/uploads/profilepic", express.static("uploads/profilepic"));

app.use((req, res, next) => {
  if (
    req.url.startsWith("/uploads/products") ||
    req.url.startsWith("/uploads/profilepic")
  ) {
    req.url = `${env.BACKEND_URL}${req.url}`;
  }
  next();
});

app.use((req, res, next) => next(createHttpError(404, "Endpoint not found")));

export default app;
