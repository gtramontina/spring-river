import test from 'ava';
import predicates from '../../predicates';

const testPacket = {toJSON: () => ({})};

const yes = () => true;
const no = () => false;

test('executes the next action when all given predicates evaluate to true', t => {
	let receivedPacket;
	predicates(yes, yes)(p => {
		receivedPacket = p;
	})(testPacket);
	t.is(receivedPacket, testPacket);
});

test('does not execute the next action when at least one predicate evaluates to false', t => {
	predicates(yes, yes, no)(() => {
		t.fail('should not execute the next action');
	})(testPacket);
});
