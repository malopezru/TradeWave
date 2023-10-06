import amqp from 'amqplib'
import { Config } from './config';
import { JwtPayload } from 'jsonwebtoken';

export class Producer {
    private channel: amqp.Channel;

    async createChannel() {
        const connection = await amqp.connect(Config.rabbitMQ.url);
        this.channel = await connection.createChannel();
    }

    async sendUser(user: JwtPayload) {
        if (!this.channel) {
           await this.createChannel();
        }
        const queue = 'UserExchange';
        this.channel.assertQueue(queue, {
            durable: true
        })
        this.channel.sendToQueue(queue, Buffer.from(user.user.id.toString()));
    }
}
