"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagePath = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const database_1 = __importDefault(require("./services/database"));
const expressApp_1 = __importDefault(require("./services/expressApp"));
exports.imagePath = path_1.default.join(__dirname, "images");
const startServer = () => {
    const app = (0, express_1.default)();
    // due to async
    (0, database_1.default)(app);
    (0, expressApp_1.default)(app);
    const PORT = config_1.PORTNO || 3000;
    app.listen(PORT, () => {
        console.log(`server listening on ${PORT}`);
    });
};
startServer();
//# sourceMappingURL=index.js.map