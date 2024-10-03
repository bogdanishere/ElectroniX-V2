import express from "express";

import * as employee from "../controllers/admin/addEmployee";
import * as provider from "../controllers/admin/addProvider";
import * as product from "../controllers/admin/addProduct";

const router = express.Router();

router.post("/createemployee", employee.addEmployee);
router.post("/createprovider", provider.addProvider);
router.post("/createproduct", product.addProduct);

export default router;
