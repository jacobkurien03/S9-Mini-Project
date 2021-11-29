const Product = require("../Models/product");

//Show List of Products
const index = async (req, res, next) => {
  Product.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "Error",
      });
    });
};

//Show Single Product
const show = async (req, res, next) => {
  let productId = req.body.productId;
  Product.findById(productId)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "Error!",
      });
    });
};

//Show product by category
const productCategory = async (req, res, next) => {
  let categoryId = req.body.categoryId;
  Product.find({categoryId:categoryId})
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "Error!",
      });
    });
};

//Add Category
const addProduct = async (req, res, next) => {
  let product = new Product({
    productname: req.body.name,
    productDesc: req.body.description,
    categoryId: req.body.categoryId,
    price: req.body.price,
    quantity: req.body.quantity,
  });
  product
    .save()
    .then((product) => {
      res.json({
        message: product,
      });
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
};

//Delete a Product
const destroy = async (req, res, next) => {
  let productId = req.body.productId;
  Product.findByIdAndRemove(productId)
    .then((product) => {
      res.json({
        message: product,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
};

module.exports = {
  index,
  show,
  destroy,
  addProduct,
  productCategory
};
