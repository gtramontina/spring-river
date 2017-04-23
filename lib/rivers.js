const packet = require('./packet');

exports.create = rapid => {
	const register = async (service, name = `unnamed_service-${Date.now()}`) => {
		const publish = async data => {
			await rapid.publish(packet.create(data));
		};

		const subscribe = await rapid.queue(name);

		subscribe(message => {
			const rawData = message.content.toString('utf-8');
			const rawJSON = JSON.parse(rawData);
			service(packet.create(rawJSON).cloneWithService(name), publish);
		});
	};

	return {register};
};
