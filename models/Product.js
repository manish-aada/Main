const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');  


const Product = sequelize.define('Product', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,  
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,  
	},
	price: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,  
	},
}, {
	tableName: 'products',  
	timestamps: false,       
});

Product.sync()
		.then(() => console.log('Product table created successfully!'))
		.catch(err => console.error('Error creating Product table:', err));
		
module.exports = { Product };

