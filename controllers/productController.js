const { Product } = require('../models/Product');
const verifyToken = require('../middlewares/authMiddleware');

// Create a new product
exports.createProduct = async (req, res) => {
	const { name, price } = req.body;
	if (!name || !price) {
		return res.status(400).json({ error: 'Name and price are required' });
	}

	try {
		const newProduct = await Product.create({ name, price });
		res.status(201).json({ message: 'Product created successfully', product: newProduct });
	} catch (error) {
		console.error('Error creating product:', error);
		res.status(500).json({ error: 'Product creation failed', details: error.message });
	}
};

// Get all products
exports.getProducts = async (req, res) => {
	try {
		const products = await Product.findAll();
		if (!products.length) {
			return res.status(404).json({ error: 'No products found' });
		}
		res.status(200).json({ products });
	} catch (error) {
		console.error('Error fetching products:', error);
		res.status(500).json({ error: 'Failed to fetch products', details: error.message });
	}
};

// Update an existing product
exports.updateProduct = async (req, res) => {
	const { id } = req.params;
	const { name, price } = req.body;

	if (!name && !price) {
		return res.status(400).json({ error: 'At least one field (name or price) is required to update' });
	}

	try {
		const product = await Product.findByPk(id);
		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}

		if (name) product.name = name;
		if (price) product.price = price;

		await product.save();
		res.status(200).json({ message: 'Product updated successfully', product });
	} catch (error) {
		console.error('Error updating product:', error);
		res.status(500).json({ error: 'Product update failed', details: error.message });
	}
};

// Delete a product
exports.deleteProduct = async (req, res) => {
	const { id } = req.params;

	try {
		const product = await Product.findByPk(id);
		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}

		await product.destroy();
		res.status(200).json({ message: 'Product deleted successfully', product });
	} catch (error) {
		console.error('Error deleting product:', error);
		res.status(500).json({ error: 'Product deletion failed', details: error.message });
	}
};
