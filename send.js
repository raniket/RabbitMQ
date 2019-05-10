// INFO

// RabbitMQ messge boaker is runnign on my localhost[http://localhost:5672]
// I am using docker image for RabbitMQ with management console by using the below command
// docker run -d --hostname my-rabbit --name some-rabbit-6 -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password -p 15672:15672 -p 5672:5672 rabbitmq:3-management


const ampq = require('amqplib/callback_api');

const QUEUE = 'rabbit_queue'

// connect to rabbitmq broaker.
ampq.connect('amqp://user:password@localhost:5672', (error, connection) => {

	if(error) throw error;

	const message = 'this is the third message......';

	// create a channel using the connection.
	connection.createChannel((error1, channel) => {

		if(error1) throw error1;
			
		channel.assertQueue(QUEUE, { durable: false });

		// send the message to the QUEUE.
		channel.sendToQueue(QUEUE, Buffer.from(message));

		console.log('[x] sent %s', message);

			// close the connection AND exit the process.
			setTimeout(() => {
				connection.close();
				process.exit(0);
			}, 50)

	});

})