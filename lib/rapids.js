const amqp = require('amqplib');
const packet = require('./packet');

const RAPIDS = 'rapids';
const FANOUT = 'fanout';
const EXCHANGE_OPTIONS = {durable: true, autoDelete: true};
const QUEUE_OPTIONS = {exclusive: true, autoDelete: true};

exports.connect = async amqpAddress => {
	const connection = await amqp.connect(amqpAddress);
	const channel = await connection.createChannel();
	await channel.assertExchange(RAPIDS, FANOUT, EXCHANGE_OPTIONS);

	const queue = async (name = '') => {
		await channel.assertQueue(name, QUEUE_OPTIONS);
		channel.bindQueue(name, RAPIDS, '');
		return listener => channel.consume(name, listener);
	};

	const publish = async data => {
		const json = packet.create(data).toJSON();
		const string = JSON.stringify(json);
		const buffer = Buffer.from(string);
		return channel.publish(RAPIDS, '', buffer);
	};

	return {publish, queue};
};
