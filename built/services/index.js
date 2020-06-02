"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("./crud/user"));
var inversify_1 = require("inversify");
exports.TYPES = {
    UserService: Symbol.for('UserService')
};
var DIContainer = new inversify_1.Container();
exports.DIContainer = DIContainer;
DIContainer.bind(exports.TYPES.UserService).toConstantValue(new user_1.default());
