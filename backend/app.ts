import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";

import products from "./routes/products";
import review from "./routes/review";
import createHttpError from "http-errors";
import auth from "./routes/auth";
import address from "./routes/userRoutes";
import command from "./routes/command";
import payment from "./routes/payment";
import search from "./routes/search";

import order from "./routes/order";

import employee from "./routes/employee/employee";

import provider from "./routes/provider/provider";

import { verifyClientToken } from "./middlewares/verifyToken";
import { verifySessionStripe } from "./middlewares/verifySessionStripe";
import { verifyEmployeeToken } from "./middlewares/verifyTokenEmployee";
import { verifyProviderToken } from "./middlewares/verifyTokenProvider";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", //"http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", auth);

app.use("/products", products);

app.use("/review", review);

app.use("/address", verifyClientToken, address);

app.use("/payment", verifyClientToken, payment);

app.use("/command", verifyClientToken, verifySessionStripe, command);

app.use("/search", search);

app.use("/order", verifyClientToken, order);

app.use("/employee", verifyEmployeeToken, employee);

app.use("/provider", verifyProviderToken, provider);

app.use("/uploads/products", express.static("uploads/products"));

app.use((req, res, next) => next(createHttpError(404, "Endpoint not found")));

export default app;
