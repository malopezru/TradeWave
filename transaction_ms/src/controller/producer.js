const amqp = require('amqplib');
const config = require('./config');

class Producer {
    channel;

    async createChannel() {
        const connection = await amqp.connect(config.rabbitMQ.url);
        this.channel = await connection.createChannel();
    }

    async sendToken(token) {
        if (!this.channel) {
           await this.createChannel();
        }
        const queue = 'TokenExchange';
        this.channel.assertQueue(queue, {
            durable: true
        })
        this.channel.sendToQueue(queue, Buffer.from(token));
    }
}

module.exports = Producer;