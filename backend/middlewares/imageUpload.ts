import multer from "multer";

export const featureImageUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter(req, file, callback) {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
      callback(null, true);
    } else {
      callback(new Error("File type not supported"));
    }
  },
});
