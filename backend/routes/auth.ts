import { Router } from "express";
import { loginClient } from "../controllers/auth";
import { createNewClient } from "../controllers/createNewClient";
import { checkExistentAccount } from "../controllers/checkExistentAccount";

const router = Router();

router.post("/login", loginClient);

router.post("/register", createNewClient);

router.post("/existentClient", checkExistentAccount);

export default router;
