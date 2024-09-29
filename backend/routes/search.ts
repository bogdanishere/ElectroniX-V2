import express from "express";

import * as search from "../controllers/searchProducts";

const router = express.Router();

router.get("/search/:page/:productName?", search.searchProducts);

export default router;
