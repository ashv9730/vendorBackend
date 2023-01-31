import multer from "multer";
import { imagePath } from "..";

// multer
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagePath);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

export const images = multer({ storage: imageStorage }).array("images", 10);
