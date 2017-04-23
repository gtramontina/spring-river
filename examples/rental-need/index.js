module.exports = publish => {
	setInterval(() => {
		publish({need: 'rental_car_offer'});
	}, 5000);
};
