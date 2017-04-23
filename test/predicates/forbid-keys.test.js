import test from 'ava';
import forbidKeys from '../../predicates/forbid-keys';

test('rejects when any of the given keys exist in the provided object', t => {
	t.is(forbidKeys('key1')({key1: 'val1'}), false);
	t.is(forbidKeys('key1', 'key2')({key1: 'val1'}), false);
	t.is(forbidKeys('key1', 'key2')({key1: 'val1', key2: 'val2'}), false);
});

test('accepts when none of the given keys exist in the provided object', t => {
	t.is(forbidKeys()({}), true);
	t.is(forbidKeys('key1')({}), true);
	t.is(forbidKeys('key1')({key9: 'val9'}), true);
	t.is(forbidKeys('key1', 'key2')({key8: 'val8', key9: 'val9'}), true);
});
