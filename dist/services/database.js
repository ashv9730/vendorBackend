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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
// data base connection
exports.default = (app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = `mongodb+srv://${config_1.dbUser}:${config_1.dbPassword}@cluster0.es5vaf2.mongodb.net/${config_1.dbName}?retryWrites=true&w=majority`;
        // Database
        mongoose_1.default.connect(url);
        const db = mongoose_1.default.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function () {
            console.log("DB Connected successfully");
        });
    }
    catch (error) {
        console.log("error form service/database : ", error);
    }
});
//# sourceMappingURL=database.js.map