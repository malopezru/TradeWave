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
exports.Producer = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const config_1 = require("./config");
class Producer {
    createChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield amqplib_1.default.connect(config_1.Config.rabbitMQ.url);
            this.channel = yield connection.createChannel();
        });
    }
    sendUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.channel) {
                yield this.createChannel();
            }
            const queue = 'UserExchange';
            this.channel.assertQueue(queue, {
                durable: true
            });
            this.channel.sendToQueue(queue, Buffer.from(user.user.id.toString()));
        });
    }
}
exports.Producer = Producer;
//# sourceMappingURL=producer.js.map