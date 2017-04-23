import test from 'ava';
import requireKeys from '../../predicates/require-keys';

test('rejects when any of the given keys is not in the provided object', t => {
	t.is(requireKeys('key1')({}), false);
	t.is(requireKeys('key1')({key9: 'val9'}), false);
	t.is(requireKeys('key1', 'key2')({key1: 'val1'}), false);
});

test('accepts when all of the given keys exist in the provided object', t => {
	t.is(requireKeys()({}), true);
	t.is(requireKeys('key1')({key1: 'val1'}), true);
	t.is(requireKeys('key1', 'key2')({key1: 'val1', key2: 'val2'}), true);
});
