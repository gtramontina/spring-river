#!/usr/bin/env node
try {
	require('./').run(require('../lib').spring);
} catch (err) {
	console.error('[✗] ' + err.message);
	process.exit(1);
}
