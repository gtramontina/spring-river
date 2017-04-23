import test from 'ava';
import packet from '../../lib/packet';

const {READ_COUNT, CONTRIBUTING_SERVICES} = packet.RESERVED_KEYS;

test('keeps track of the given data', t => {
	const p = packet.create({some: 'data', other: 'info'});
	t.is(p.some, 'data');
	t.is(p.other, 'info');
});

test('allows adding extra attributes', t => {
	const p = packet.create({some: 'data'});
	p.other = 'info';
	t.is(p.other, 'info');
});

test('does not allow overriding reserved keys', t => {
	const p = packet.create();
	const allReservedKeys = Object.values(packet.RESERVED_KEYS);
	allReservedKeys.forEach(key => {
		t.throws(() => {
			p[key] = 'new value';
		}, /reserved/);
	});
});

test('allows serializing the given data plus metadata to JSON', t => {
	const p = packet.create({some: 'data'});
	const expectedMetadata = {
		[READ_COUNT]: 0,
		[CONTRIBUTING_SERVICES]: []
	};
	t.deepEqual(p.toJSON(), Object.assign({some: 'data'}, expectedMetadata));
});

test(`increases the reserved "${READ_COUNT}" value by one for every newly created packet`, t => {
	t.is(packet.create().toJSON()[READ_COUNT], 0);
	t.is(packet.create({[READ_COUNT]: 0}).toJSON()[READ_COUNT], 1);
	t.is(packet.create({[READ_COUNT]: 10}).toJSON()[READ_COUNT], 11);
	t.is(packet.create({[READ_COUNT]: 89}).toJSON()[READ_COUNT], 90);
});

test(`allows cloning the current packet while adding a new "${CONTRIBUTING_SERVICES}"`, t => {
	const p = packet.create({some: 'data'});
	const pClone = p.cloneWithService('new service');
	t.not(p, pClone);
	t.deepEqual(pClone.some, 'data');
	t.deepEqual(p[CONTRIBUTING_SERVICES], []);
	t.deepEqual(pClone[CONTRIBUTING_SERVICES], ['new service']);
});

test(`preserves the "${READ_COUNT}" value when cloning`, t => {
	const p = packet.create({[READ_COUNT]: 10});
	const pClone = p.cloneWithService('new service');
	t.deepEqual(pClone[READ_COUNT], 10);
	const pCloneClone = p.cloneWithService('another service');
	t.deepEqual(pCloneClone[READ_COUNT], 10);
});
