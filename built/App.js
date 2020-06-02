"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var routers_1 = __importDefault(require("./routers"));
var config_1 = require("./config");
var mongoose_1 = __importDefault(require("mongoose"));
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.initConfig();
        this.initMongo();
        this.initTracking();
        this.initRoutes();
    }
    App.prototype.initConfig = function () {
        this.app.use(body_parser_1.default.json());
    };
    App.prototype.initTracking = function () {
        this.app.use(morgan_1.default('dev'));
    };
    App.prototype.initRoutes = function () {
        this.app.use('/api', routers_1.default);
    };
    App.prototype.initMongo = function () {
        var mongo = config_1.config.database.mongo;
        console.info('9779 mono', mongo);
        mongoose_1.default.connect(mongo, function () {
            console.info('Mongodb connected');
        });
    };
    return App;
}());
exports.default = new App().app;
