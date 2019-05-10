// INFO

// RabbitMQ messge boaker is runnign on my localhost[http://localhost:5672]
// I am using docker image for RabbitMQ with management console by using the below command
// docker run -d --hostname my-rabbit --name some-rabbit-6 -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password -p 15672:15672 -p 5672:5672 rabbitmq:3-management


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