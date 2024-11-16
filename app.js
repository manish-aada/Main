const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middlewares/authMiddleware');

dotenv.config(); 

const app = express();
app.use(express.json()); 


app.use('/api/products', productRoutes);
app.use('/api/authentication', authRoutes);


app.use((err, req, res, next) => {
	console.error(error.stack);
	res.status(500).json({ error: 'internal server error' });
});


const PORT = process.env.PORT || 3000 ;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
