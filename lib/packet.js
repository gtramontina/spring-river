// The following keys are reserved for system usage:
const READ_COUNT = 'system_read_count';
const CONTRIBUTING_SERVICES = 'contributing_services';

exports.RESERVED_KEYS = {
	READ_COUNT,
	CONTRIBUTING_SERVICES
};

exports.create = data => {
	const raw = Object.assign({}, data);

	raw[READ_COUNT] = (raw[READ_COUNT] === undefined ? -1 : raw[READ_COUNT]) + 1;
	raw[CONTRIBUTING_SERVICES] = (raw[CONTRIBUTING_SERVICES] || []);

	const toJSON = () => Object.assign({}, raw);

	const cloneWithService = serviceName => exports.create(Object.assign({}, raw, {
		[CONTRIBUTING_SERVICES]: raw[CONTRIBUTING_SERVICES].concat(serviceName),
		[READ_COUNT]: raw[READ_COUNT] - 2
	}));

	const api = {toJSON, cloneWithService};

	return new Proxy(raw, {
		get(object, name) {
			return (object[name] || api[name]);
		},
		set(object, name, value) {
			if (Object.values(exports.RESERVED_KEYS).includes(name)) {
				throw new Error(`"${name}" is a reserved key.`);
			}
			object[name] = value;
			return true;
		}
	});
};
