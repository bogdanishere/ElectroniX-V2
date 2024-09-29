import { Router } from "express";
import { showOrders } from "../../controllers/provider/showOrders";
import { confirmOrder } from "../../controllers/provider/confirmOrder";
import { deleteOrder } from "../../controllers/provider/deleteOrder";
import { featureImageUpload } from "../../middlewares/imageUpload";
import { addProduct } from "../../controllers/provider/addProduct";
import { showProviderProducts } from "../../controllers/provider/showProviderProducts";
import { deleteProduct } from "../../controllers/provider/deleteProduct";

const router = Router();

router.get("/orders", showOrders);
router.patch("/confirmorder/:orderDetailId", confirmOrder);
router.delete("/deleteorder/:orderDetailId", deleteOrder);

router.post("/addproduct", featureImageUpload.single("image"), addProduct);

router.get("/products/:page", showProviderProducts);

router.delete("/deleteproduct/:productId", deleteProduct);

export default router;
