import multer from "multer";

export const featureImageUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 8 * 20,
  },
  fileFilter(req, file, callback) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "jpg" ||
      file.size > 150000
    ) {
      callback(null, true);
    } else {
      callback(new Error("File type not supported"));
    }
  },
});

export const featureImageProfile = multer({
  limits: {
    fileSize: 1024 * 1024 * 8 * 20,
  },
  fileFilter(req, file, callback) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "jpg" ||
      file.size > 150000
    ) {
      callback(null, true);
    } else {
      callback(new Error("File type not supported"));
    }
  },
});
