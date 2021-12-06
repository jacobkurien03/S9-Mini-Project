const Product = require("../Models/product");

//Show List of Products
const index = async (req, res, next) => {
  Product.find()
    .then((response) => {
      return res.status(200).send({
        response,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
};

//Show Single Product
const show = async (req, res, next) => {
  let productId = req.body.productId;
  Product.findById(productId)
    .then((response) => {
      return res.status(200).send({
        response,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
};

//Show product by category
const productCategory = async (req, res, next) => {
  let categoryId = req.body.categoryId;
  Product.find({ categoryId: categoryId })
    .then((response) => {
      return res.status(200).send({
        response,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
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
      return res.status(200).send({
        message: product,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
};

//Delete a Product
const destroy = async (req, res, next) => {
  let productId = req.body.productId;
  Product.findByIdAndRemove(productId)
    .then((product) => {
      return res.status(200).send({
        message: product,
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
};

module.exports = {
  index,
  show,
  destroy,
  addProduct,
  productCategory,
};
