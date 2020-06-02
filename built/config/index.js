"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./configEnv");
console.info('9779 env', process.env);
exports.config = {
    database: {
        mongo: process.env.MONGOLOCAL_URI
    }
};
