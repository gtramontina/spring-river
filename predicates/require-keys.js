module.exports = (...requiredKeys) => json => {
	const jsonKeys = Object.keys(json);
	return requiredKeys.every(k => jsonKeys.includes(k));
};
