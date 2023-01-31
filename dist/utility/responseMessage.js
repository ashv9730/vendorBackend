"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMessage = void 0;
const responseMessage = (res, statusCode, message, success = false) => {
    return res.status(statusCode).json({ success, message });
};
exports.responseMessage = responseMessage;
//# sourceMappingURL=responseMessage.js.map