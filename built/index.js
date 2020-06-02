"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = __importDefault(require("./App"));
var PORT = 8081;
App_1.default.listen(PORT, function () {
    console.log("Running on port ", PORT);
});
