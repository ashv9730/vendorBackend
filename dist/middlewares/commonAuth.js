"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const passwordUtility_1 = require("../utility/passwordUtility");
const responseMessage_1 = require("../utility/responseMessage");
// can we use for both customer and vendor
const Authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req)
    const signature = yield (0, passwordUtility_1.validateToken)(req);
    if (signature) {
        // console.log( "message: User authorised")
        return next();
    }
    else {
        return (0, responseMessage_1.responseMessage)(res, 401, "User Not Authorised");
    }
});
exports.Authenticate = Authenticate;
//# sourceMappingURL=commonAuth.js.map