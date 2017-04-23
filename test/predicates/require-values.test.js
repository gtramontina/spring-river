import test from 'ava';
import requireValues from '../../predicates/require-values';

test('rejects when any of the given key/value pairs is not in the provided object', t => {
	t.is(requireValues({key1: null})({}), false);
	t.is(requireValues({key1: 'val1'})({key1: null}), false);
	t.is(requireValues({key1: 'val1', key2: null})({key1: 'val1'}), false);
});

test('accepts when all of the given key/value pairs exist in the provided object', t => {
	t.is(requireValues()({}), true);
	t.is(requireValues({key1: null})({key1: null}), true);
	t.is(requireValues({key1: 'val1'})({key1: 'val1'}), true);
	t.is(requireValues({key1: 'val1'})({key1: 'val1', key9: 'val9'}), true);
	t.is(requireValues({key1: 'val1', key2: null})({key1: 'val1', key2: null}), true);
	t.is(requireValues({key1: 'val1', key2: 'val2'})({key1: 'val1', key2: 'val2'}), true);
});
