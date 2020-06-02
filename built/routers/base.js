"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseRouter = /** @class */ (function () {
    function BaseRouter() {
    }
    BaseRouter.prototype.route = function (func) {
        var _this = this;
        return function (req, res) { return func
            .bind(_this)(req, res)
            .catch(function (err) {
            console.info('9779 error', err);
        }); };
    };
    return BaseRouter;
}());
exports.default = BaseRouter;
