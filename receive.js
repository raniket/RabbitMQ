// INFO

// RabbitMQ messge boaker is runnign on my localhost[http://localhost:5672]
// I am using official docker image to RabbitMQ using the below command
// docker run -d --hostname my-rabbit  -p 5672:5672 --name some-rabbit-5 rabbitmq:3


const amqp = require('amqplib/callback_api');

const QUEUE = 'rabbit_queue';

amqp.connect('amqp://user:password@localhost:5672', (error, connection) => {

	if(error) throw error;

	connection.createChannel((error1, channel) => {

		if(error1) throw error1;

		channel.assertQueue(QUEUE, { durable: false });

		console.log('[*] waiting for message in %s. To exit press CTRL+C', QUEUE);

		channel.consume(QUEUE, (message) => {
			console.log('[*] Recieved::: %s', message.content.toString());
		}, { noAck: true });

	});

});