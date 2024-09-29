import express from "express";

import * as command from "../controllers/addCommand";

const router = express.Router();

router.post("/command", command.addCommand);

export default router;
