const Category = require("../Models/category");
const SubCategory = require("../Models/subCategory")

//Show List of Categories
const index = async (req, res, next) => {
  Category.find()
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

//Show Single category
const show = async (req, res, next) => {
  let categoryId = req.body.categoryId;
  Category.findById(categoryId)
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

//Add category
const addCategory = async (req, res, next) => {
  let category = new Category({
    name: req.body.name,
    description: req.body.description,
    sub_categoryIds: req.body.subCategoryIds
  });
  category
    .save()
    .then((user) => {
      res.json({
        message: "Category Added Successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
};

//Delete a category
const destroy = async (req, res, next) => {
  let categoryId = req.body.categoryId;
  Category.findByIdAndRemove(categoryId)
    .then((user) => {
      res.json({
        message: "Category Deleted Successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
};


//////////////////////////SUB CATEGORY////////////////////
//Show List of SubCategory
const subCategoryIndex = async (req, res, next) => {
  SubCategory.find()
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

//Show Single User
const subCategoryShow = async (req, res, next) => {
  let subCategoryId = req.body.subCategoryId;
  SubCategory.findById(categoryId)
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

//Add User
const addSubCategory = async (req, res, next) => {
  let subCategory = new SubCategory({
    name: req.body.name
  });
  subCategory
    .save()
    .then((user) => {
      res.json({
        message: "Sub Category Added Successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
};

//Delete a User
const destroySubCategory = async (req, res, next) => {
  let subCategoryId = req.body.subCategoryId;
  SubCategory.findByIdAndRemove(subCategoryId)
    .then((user) => {
      res.json({
        message: "Sub Category Deleted Successfully",
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
  addCategory,
  subCategoryIndex,
  subCategoryShow,
  addSubCategory,
  destroySubCategory
};
