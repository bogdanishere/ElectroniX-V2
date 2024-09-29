import express from "express";

import * as stripePayment from "../controllers/paymentStripe";

const router = express.Router();

router.post("/payment", stripePayment.paymentStripe);

export default router;
