const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/superAdminController");
const ProductController = require("../Controllers/productController");
const CategoryController = require("../Controllers/categoryController");
const DiscountController = require("../Controllers/discountController");
const { route } = require("./authentication");
const Authenticate = require("../Middleware/authenticate");
const AdminGenerator = require("../Controllers/admingenerator");
const productController = require("../Controllers/productController");

/*To access these routes admin authentication is needed in the header............User should be an admin*/
/*To do so, copy the token of the admin when you login and paste it in the header with name Authorization and value as Bearer 'tokenvalue'*/

//Shows all users
router.get("/showUsers", Authenticate, UserController.index);

//Select individual Users
router.post("/showUser", Authenticate, UserController.show);

//add New User
router.post("/addUser", Authenticate, UserController.store);

//Change Password
router.post("/changePass", Authenticate, UserController.update);

//Delete a user
router.post("/deleteUser", Authenticate, UserController.destroy);
//Delete a user
router.post("/reactivateUser", Authenticate, UserController.reActivate);

//Create New admin
router.post("/newAdmin", Authenticate, AdminGenerator.admingenerator);

//Delete an admin
router.post("/deleteAdmin", Authenticate, AdminGenerator.admindelete);

//Categories
router.post("/addCategory",Authenticate, CategoryController.addCategory);
router.post("/deleteCategory",Authenticate, CategoryController.destroy);
router.post("/showCategory",Authenticate, CategoryController.show);
router.get("/showCategories",Authenticate, CategoryController.index);


//SubCategories
router.post("/addSubCategory",Authenticate, CategoryController.addSubCategory);
router.post("/deleteSubCategory",Authenticate, CategoryController.destroySubCategory);
router.post("/showSubCategory",Authenticate, CategoryController.subCategoryShow);
router.get("/showSubCategories",Authenticate, CategoryController.subCategoryIndex);

//Products
router.post("/addProduct", productController.addProduct);
router.post("/deleteProduct", productController.destroy);
router.post("/showProduct", productController.show);
router.get("/showProducts", productController.index);
router.post("/showProductCategory", productController.productCategory);

module.exports = router;
