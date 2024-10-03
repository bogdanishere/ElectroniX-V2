import express from "express";
import * as updateProfile from "../controllers/updateImageProfile";
import { featureImageProfile } from "../middlewares/imageUpload";

const router = express.Router();

router.patch(
  "/profile",
  featureImageProfile.single("image_profile"),
  updateProfile.updateProfile
);

export default router;
