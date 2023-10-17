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

        const queue = 'user_queue';
        const q = await this.channel.assertQueue('', {
            durable: false
        });

        const correlationId = this.generateUuid();

        this.channel.consume(q.queue, (msg) => {
            if (msg.properties.correlationId == correlationId) {
                const message = msg.content.toString();
                console.log(' [.] Got %s', msg.content.toString());
            }
        }, {
            noAck: true
        })

        this.channel.sendToQueue(queue, Buffer.from(token),{
            correlationId: correlationId,
            replyTo: q.queue
        })
        

        /* const queue = 'TokenExchange';
        this.channel.assertQueue(queue, {
            durable: true
        })
        this.channel.sendToQueue(queue, Buffer.from(token));
     */}

     generateUuid() {
        return Math.random().toString() +
               Math.random().toString() +
               Math.random().toString();
      }
}

module.exports = Producer;