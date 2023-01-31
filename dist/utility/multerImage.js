"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.images = void 0;
const multer_1 = __importDefault(require("multer"));
const __1 = require("..");
// multer
const imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __1.imagePath);
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + "-" + file.originalname);
    },
});
exports.images = (0, multer_1.default)({ storage: imageStorage }).array("images", 10);
//# sourceMappingURL=multerImage.js.map