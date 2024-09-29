import express from "express";
import * as reviewController from "../controllers/getReview";
import * as reviewPostController from "../controllers/addReview";
import { verifyClientToken } from "../middlewares/verifyToken";

const router = express.Router();

router.get("/review/:productID", reviewController.getReview);
router.post("/review", verifyClientToken, reviewPostController.addReview);

export default router;
