import amqp, { ConsumeMessage } from 'amqplib'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Config } from './config'
import { Producer } from './producer';

export class Subscriber {
    async sendUser() {
        const connection = await amqp.connect(Config.rabbitMQ.url);
        const channel = await connection.createChannel();

        const exchangeName = 'tokenEncryptedExchange';
        await channel.assertExchange(exchangeName, 'direct');

        const queue = "TokenExchange"
        await channel.assertQueue(queue, {
            durable: true
        });

        channel.consume(queue, async (msg) => {
            const user = await jwt.verify((msg as ConsumeMessage).content.toString(), 'secret_key')
            const producer = new Producer()
            producer.sendUser(user as JwtPayload)
            setTimeout(function() {
              connection.close();
            }, 500);
        },
        {
            noAck: true
        })
    }
}