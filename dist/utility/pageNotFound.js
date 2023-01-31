"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageNotFound = void 0;
const responseMessage_1 = require("./responseMessage");
const pageNotFound = (req, res, next) => {
    return (0, responseMessage_1.responseMessage)(res, 404, "Url Not Found", false);
};
exports.pageNotFound = pageNotFound;
//# sourceMappingURL=pageNotFound.js.map