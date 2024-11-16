const User = require('../models/User'); 


const createUser = async (userData) => {
	const { name, email, password } = userData;
	const user = await User.create({ name, email, password });
	return user;
};

const findUserByEmail = async (email) => {
	const user = await User.findOne({ where: { email } });
	return user;
};

module.exports = { createUser, findUserByEmail };
