"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminCtrl_1 = require("./adminCtrl");
const adminRouter = express_1.default.Router();
adminRouter.post("/signup", adminCtrl_1.addAdmin);
adminRouter.post("/login", adminCtrl_1.adminLogin);
adminRouter.get("/", adminCtrl_1.getAdmins);
adminRouter.get("/:id", adminCtrl_1.getAdminById);
exports.default = adminRouter;
