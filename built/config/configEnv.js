"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
//9779 knowledge
var result = dotenv_1.default.config({ path: __dirname + "/../../.env" });
console.info('9779 config', result);
