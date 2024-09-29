import { Router } from "express";
import { showOrders } from "../../controllers/employee/showOrders";
import { brandCount } from "../../controllers/employee/brandCount";
import { confirmOrder } from "../../controllers/employee/confirmOrder";
import { deleteOrder } from "../../controllers/employee/deleteOrder";

const router = Router();

router.get("/orders", showOrders);
router.get("/brandcount/:numberOfBrandsToShow", brandCount);
router.patch("/confirmorder/:orderId", confirmOrder);
router.delete("/deleteorder/:orderId", deleteOrder);

export default router;
