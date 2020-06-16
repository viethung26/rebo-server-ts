import BaseMiddleWare from "./base";
import {Request, Response} from "../routers/base"
import express from "express"
import QueryInfoMiddleware from "./queryInfo";
import AuthenticationMiddleware from "./auth";
import SocketMiddleware from "./socket";


export const getQueryMiddleware = new QueryInfoMiddleware()
export const authenticateMiddleware = new AuthenticationMiddleware()
export const socketMiddleware = new SocketMiddleware()