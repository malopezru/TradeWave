import amqp, { ConsumeMessage } from 'amqplib'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Config } from './config'
import { Producer } from './producer';

export class Subscriber {
    async sendUser() {
        const connection = await amqp.connect(Config.rabbitMQ.url);
        const channel = await connection.createChannel();

        /* const exchangeName = 'tokenEncryptedExchange';
        await channel.assertExchange(exchangeName, 'direct'); */

        const queue = "user_queue"
        await channel.assertQueue(queue, {
            durable: false
        });
        channel.prefetch(1);

        channel.consume(queue, async (msg) => {
            const user = await jwt.verify((msg as ConsumeMessage).content.toString(), 'secret_key')
            await channel.sendToQueue(msg?.properties.replyTo,
                Buffer.from(user.toString()), {
                    correlationId: msg?.properties.correlationId
                })

                channel.ack(msg as ConsumeMessage);
            }
        )
    }
}