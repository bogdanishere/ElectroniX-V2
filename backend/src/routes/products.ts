import express from "express";

import * as productsController from "../controllers/getProducts";
import * as productController from "../controllers/getProductDetails";

const router = express.Router();

router.get("/products", productsController.getProducts);

router.get("/product/:productId", productController.getProductDetails);

export default router;
