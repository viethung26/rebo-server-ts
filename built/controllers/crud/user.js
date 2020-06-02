"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crud_1 = __importDefault(require("../crud"));
var services_1 = require("../../services");
var UserController = /** @class */ (function (_super) {
    __extends(UserController, _super);
    function UserController() {
        return _super.call(this, services_1.DIContainer.get(services_1.TYPES.UserService)) || this;
    }
    return UserController;
}(crud_1.default));
exports.default = UserController;
