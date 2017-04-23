const predicates = require('spring-river/predicates');

const {requireValues, forbidKeys} = predicates;
const randomBetween = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);

const filters = predicates(
  requireValues({need: 'rental_car_offer'}),
  forbidKeys('solution')
);

module.exports = filters((packet, publish) => {
	packet.solution = randomBetween(10, 100);
	publish(packet);
});
