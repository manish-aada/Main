const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../services/userService');
require('dotenv').config();

const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: 'Name, email, and password are required' });
		}

		const existingUser = await findUserByEmail(email);
		if (existingUser) {
			return res.status(409).json({ message: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await createUser({ name, email, password: hashedPassword });

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

		res.status(201).json({ message: 'User registered successfully', user, token });
	} catch (error) {
		console.error('Registration Error:', error);
		res.status(500).json({ message: 'Registration failed', error: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password are required' });
		}

		const user = await findUserByEmail(email);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

		res.status(200).json({ message: 'Login successful', token });
	} catch (error) {
		console.error('Login Error:', error);
		res.status(500).json({ message: 'Login failed', error: error.message });
	}
};

module.exports = { register, login };
