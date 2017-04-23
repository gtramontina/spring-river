module.exports = (...forbiddenKeys) => json => {
	const jsonKeys = Object.keys(json);
	return !forbiddenKeys.some(k => jsonKeys.includes(k));
};
