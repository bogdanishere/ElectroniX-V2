import express from "express";
import * as orderController from "../controllers/searchFinishOrders";

const router = express.Router();

router.get("/order", orderController.searchFinishOrders);

export default router;
