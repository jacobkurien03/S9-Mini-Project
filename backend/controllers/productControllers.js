import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';


// @desc fetch all the products
// @route GET /api/products
// @access PUBLIC
const getAllProducts = asyncHandler(async (req, res) => {
	const page = Number(req.query.pageNumber) || 1; // the current page number being fetched
	const pageSize = Number(req.query.pageSize) || 10; // the total number of entries on a single page

	// match all products which include the string of chars in the keyword, not necessarily in the given order
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'si',
				},
		  }
		: {};
	const count = await Product.countDocuments({ ...keyword }); // total number of products which match with the given key

	// find all products that need to be sent for the current page, by skipping the documents included in the previous pages
	// and limiting the number of documents included in this request
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	// send the list of products, current page number, total number of pages available
	res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch a single product by id
// @route GET /api/products/:id
// @access PUBLIC
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) res.json(product);
	else {
		// throw a custom error so that our error middleware can catch them and return apt json
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access PRIVATE/ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		await product.remove();
		res.json({ message: 'Product removed from DB' });
	} else {
		// throw a custom error so that our error middleware can catch them and return apt json
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc Create a product
// @route POST /api/products/
// @access PRIVATE/ADMIN
const createProduct = asyncHandler(async (req, res) => {
	// create a dummy product which can be edited later
	console.log('hi')
	const product = new Product({
		name: req.body.name,
		brand: req.body.brand,
		category: req.body.category,
		numReviews: 0,
		countInStock: req.body.countInStock,
		price: req.body.price,
		user: req.body.id,
		image: req.body.image,
		description: req.body.description,
	});
	const createdProduct = await product.save().catch((error)=>{console.log(error)});
	res.status(201).json(createdProduct);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access PRIVATE/ADMIN
const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		brand,
		category,
		numReviews,
		countInStock,
		description,
		image,
	} = req.body;
	const product = await Product.findById(req.params.id);



	// update the fields which are sent with the payload
	if (product) {
		if (name) product.name = name;
		if (price) product.price = price;
		if (brand) product.brand = brand;
		if (category) product.category = category;
		if (numReviews) product.numReviews = numReviews;
		if (countInStock) product.countInStock = countInStock;
		if (description) product.description = description;
		if (image) product.image = image;

		const updatedProduct = await product.save();
		if (updatedProduct) res.status(201).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not available');
	}
});

// @desc Create a product review
// @route POST /api/products/:id/reviews
// @access PRIVATE
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, review } = req.body;
	const product = await Product.findById(req.params.id);
	if (product) {
		// If the user has already reviewed this product, throw an error
		const reviewedAlready = product.reviews.find(
			(rev) => rev.user.toString() === req.user._id.toString()
		);
		if (reviewedAlready) {
			res.status(400);
			throw new Error('Product Already Reviewed');
		}

		const newReview = {
			name: req.user.name,
			user: req.user._id,
			avatar: req.user.avatar,
			rating: Number(rating),
			review,
		};

		// store the new review and update the rating of this product
		product.reviews.push(newReview);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((acc, ele) => acc + ele.rating, 0) /
			product.numReviews;
		const updatedProduct = await product.save();
		if (updatedProduct) res.status(201).json({ message: 'Review Added' });
	} else {
		res.status(404);
		throw new Error('Product not available');
	}
});

// @desc fetch top rated products
// @route GET /api/products/top
// @access PUBLIC
const getTopProducts = asyncHandler(async (req, res) => {
	// get top 4 rated products
	const topProducts = await Product.find({}).sort({ rating: -1 }).limit(4);
	res.json(topProducts);
});


// Create Category
// @desc Create a product
// @route POST /api/products/
// @access PRIVATE/ADMIN
const createCategory = asyncHandler(async (req, res) => {
	// create a dummy product which can be edited later
	const category = new Category({
		name: req.body.name,
		description: req.body.description,
	});
	const createdProduct = await category.save();
	res.status(201).json(createdProduct);
});

// @desc Fetch a single product by id
// @route GET /api/products/:id
// @access PUBLIC
const getCategoryById = asyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id);
	if (category) res.json(category);
	else {
		// throw a custom error so that our error middleware can catch them and return apt json
		res.status(404);
		throw new Error('Category not found');
	}
});

const getCategory = asyncHandler(async (req, res) => {
	const category = await Category.find();
	if (category) res.json(category);
	else {
		// throw a custom error so that our error middleware can catch them and return apt json
		res.status(404);
		throw new Error('Category not found');
	}
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access PRIVATE/ADMIN
const deleteCategory = asyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id);
	if (category) {
		const products = await Product.find({ category: category.name });
		if(products.length>0){
			res.status(500).json({ message: 'Category cannot be removed' });
		}else{
			await category.remove();
			res.json({ message: 'Category removed from DB' });
		}
	} else {
		// throw a custom error so that our error middleware can catch them and return apt json
		res.status(404);
		throw new Error('Category not found');
	}
});

const updateCategory = asyncHandler(async (req, res) => {
	const {
		name,
		description
	} = req.body;
	const category = await Category.findById(req.params.id);



	// update the fields which are sent with the payload
	if (category) {
		if (name) category.name = name;
		if (description) category.description = description;

		const updatedCategory = await category.save();
		if (updatedCategory) res.status(201).json(updatedCategory);
	} else {
		res.status(404);
		throw new Error('Category not available');
	}
});





export {
	getProductById,
	getAllProducts,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
	createCategory,
	getCategory,
	getCategoryById,
	deleteCategory,
	updateCategory
};
