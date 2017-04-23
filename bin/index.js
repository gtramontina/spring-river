'use strict';

const resolve = require('path').resolve;
const nodeVersion = require('node-version');
const args = require('args');

if (nodeVersion.major < 6) {
	throw new Error('Node.js 6 or greater is required. Please upgrade!');
}

args.option(['a', 'address'], 'AMQP address', process.env.ADDRESS || 'amqp://localhost', String);

const flags = args.parse(process.argv, {minimist: {alias: {a: 'address'}}, value: '[<service_file>]'});

let file = args.sub[0];
let serviceName;

try {
	const pkg = require(resolve(process.cwd(), 'package.json'));
	serviceName = pkg.name;

	if (!file) {
		file = pkg.main || 'index.js';
	}
} catch (err) {
	if (err.code === 'MODULE_NOT_FOUND') {
		throw new Error('Could not read "package.json":\n' + err.message);
	}
}

if (!file) {
	args.showHelp();
}

if (file[0] !== '/') {
	file = resolve(process.cwd(), file);
}

exports.run = serviceType => {
	try {
		serviceType(file, serviceName, flags);
	} catch (err) {
		throw new Error(err.message + ':\n', err.stack);
	}
};
