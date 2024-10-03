import { Router } from "express";
import * as address from "../controllers/address";

const router = Router();

router.post("/checkAddress", address.checkAddress);

router.post("/address", address.addAddress);

export default router;
