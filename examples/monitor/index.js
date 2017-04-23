const pretty = require('prettyjson');

const log = message => {
	console.log(`> [${Date.now()}] ******************************\n${message}\n`);
};

module.exports = packet => {
	log(pretty.render(packet.toJSON()));
};
