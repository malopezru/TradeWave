const amqp = require('amqplib');
const config = require('./config');

class Subscriber {
    async getUser() {
        const connection = await amqp.connect(config.rabbitMQ.url);
        const channel = await connection.createChannel();

        const exchangeName = 'userDataExchange';
        await channel.assertExchange(exchangeName, 'direct');

        const queue = "UserExchange"
        await channel.assertQueue(queue, {
            durable: true
        });

        channel.consume(queue, (msg) => {
            console.log("received:" + msg.content.toString())
        },
        {
            noAck: true
        })
    }
}

module.exports = Subscriber;