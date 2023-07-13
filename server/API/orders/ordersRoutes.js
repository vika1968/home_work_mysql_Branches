"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordersCtrl_1 = require("./ordersCtrl");
const orderRouter = express_1.default.Router();
orderRouter.get("/:id", ordersCtrl_1.getOrdersByUserID);
exports.default = orderRouter;
