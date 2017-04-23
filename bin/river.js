#!/usr/bin/env node
try {
	require('./').run(require('../lib').river);
} catch (err) {
	console.error('[✗] ' + err.message);
	process.exit(1);
}
