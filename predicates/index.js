module.exports = (...predicates) => next => (packet, publish) => {
	const json = packet.toJSON();
	const matches = predicates.every(p => p(json));
	if (matches) {
		next(packet, publish);
	}
};

module.exports.requireKeys = require('./require-keys');
module.exports.forbidKeys = require('./forbid-keys');
module.exports.requireValues = require('./require-values');
