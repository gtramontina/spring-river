const load = require('./load');
const rapids = require('./rapids');
const rivers = require('./rivers');
const listening = require('./listening');

exports.river = async (file, name, {address}) => {
	const service = load(file);
	const rapid = await rapids.connect(address);
	const river = rivers.create(rapid);
	await river.register(service, name);
	listening(name, address);
};

exports.spring = async (file, name, {address}) => {
	const service = load(file);
	const rapid = await rapids.connect(address);
	service(rapid.publish);
	listening(name, address, {borderColor: 'cyan'});
};
