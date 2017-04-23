module.exports = file => {
	let loaded;

	try {
		loaded = require(file);
		if (loaded && typeof loaded === 'object') {
			loaded = loaded.default;
		}
	} catch (err) {
		const error = new Error(`Could not load "${file}"`);
		error.stack = err.stack;
		throw error;
	}

	if (typeof loaded !== 'function') {
		throw new TypeError(`"${file}" does not export a function`);
	}
	return loaded;
};
