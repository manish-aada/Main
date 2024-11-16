const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 


const User = sequelize.define('User', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,  
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,  
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,  
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,  
	},
}, {
	tableName: 'users',  
	timestamps: true,    
});


User.sync()
		.then(() => console.log('User table created successfully!'))
		.catch(err => console.error('Error creating User table:', err));

module.exports = User;


