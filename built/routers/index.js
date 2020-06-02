"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
require("reflect-metadata");
var route = express_1.default.Router();
var versions = fs_1.default.readdirSync(__dirname);
versions.forEach(function (version) {
    var versionDir = path_1.default.join(__dirname, version);
    if (fs_1.default.lstatSync(versionDir).isDirectory()) {
        var modules = fs_1.default.readdirSync(versionDir).filter(function (m) { return !m.startsWith("index"); });
        var subRoute_1 = express_1.default.Router();
        modules.forEach(function (module) {
            var Router = require(path_1.default.join(__dirname, version, module)).default;
            // 9779 improvement: auto inject controller
            var router = new Router();
            subRoute_1.use("/" + module.split(".")[0], router.router);
        });
        route.use("/" + version, subRoute_1);
    }
});
exports.default = route;
