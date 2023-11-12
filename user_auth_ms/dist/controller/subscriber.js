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
exports.Subscriber = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
class Subscriber {
    sendUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield amqplib_1.default.connect(config_1.Config.rabbitMQ.url);
            const channel = yield connection.createChannel();
            /* const exchangeName = 'tokenEncryptedExchange';
            await channel.assertExchange(exchangeName, 'direct'); */
            const queue = "user_queue";
            yield channel.assertQueue(queue, {
                durable: false
            });
            channel.prefetch(1);
            channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                const user = yield jsonwebtoken_1.default.verify(msg.content.toString(), 'secret_key');
                yield channel.sendToQueue(msg === null || msg === void 0 ? void 0 : msg.properties.replyTo, Buffer.from(user.toString()), {
                    correlationId: msg === null || msg === void 0 ? void 0 : msg.properties.correlationId
                });
                channel.ack(msg);
            }));
        });
    }
}
exports.Subscriber = Subscriber;
//# sourceMappingURL=subscriber.js.map