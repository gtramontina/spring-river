module.exports = (requiredValues = {}) => json => {
	const requiredEntries = Object.entries(requiredValues);
	return requiredEntries.every(([k, v]) => json[k] === v);
};
