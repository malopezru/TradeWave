"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const User_1 = require("../routes/User");
const connection_1 = require("../db/connection");
const subscriber_1 = require("../controller/subscriber");
class Server {
    constructor() {
        this.apiPaths = {
            users: '/users'
        };
        this.subscriber = new subscriber_1.Subscriber();
        this.app = (0, express_1.default)();
        this.port = 4000;
        this.dbConnection();
        this.middlewares();
        this.routes();
        this.subscriber.sendUser();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.db.authenticate();
                console.log('Connected to mySQL Database');
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.apiPaths.users, User_1.router);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('User MS running in port ' + this.port);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map