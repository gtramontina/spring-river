const boxen = require('boxen');
const chalk = require('chalk');
const wrap = require('wrap-ansi');
const dedent = require('dedent');
const trunc = require('cli-truncate');

const MAX_WIDTH = 40;

module.exports = (name, address, {borderStyle = 'single', borderColor = 'green'} = {}) => {
	const notes = [];
	if (!name) {
		notes.push(`If you'd like your service to have a name, please do so by adding "name" to your "package.json".`);
	}

	const message = wrap(dedent`
		${chalk.bold.blue('Service running!')}

		${trunc(chalk.bold('• Name:     ') + (name || chalk.bold.red('<unnamed service>')), MAX_WIDTH)}
		${trunc(chalk.bold('• Address:  ') + address, MAX_WIDTH)}

		${notes.map(n => chalk.bold.yellow('NOTE: ') + chalk.yellow(n)).join('\n\n')}
	`, MAX_WIDTH);

	console.log(boxen(message, {
		padding: 1,
		borderColor,
		borderStyle
	}));
};
