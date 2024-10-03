import express from "express";

import * as auth from "../controllers/createClient";

import * as login from "../controllers/login";

import * as check from "../controllers/checkExistentAccount";

const router = express.Router();

router.post("/login", login.loginClient);

router.post("/register", auth.createNewClient);

router.post("/existentClient", check.checkExistentAccount);

export default router;
