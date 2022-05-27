import express from "express";
import {
  deleteProduct,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  createCategory,
  getCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
} from "../controllers/productControllers.js";
import {
  createWishlist,
  getWishlistForUser,
  removeProductForUser,
} from "../controllers/wishlistController.js";
import { protectRoute, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc fetch all the products, create a product
// @route GET /api/products
// @access PUBLIC
router.route("/").get(getAllProducts).post(createProduct);

// @desc fetch top rated products
// @route GET /api/products/top
// @access PUBLIC
router.route("/top").get(getTopProducts);

// @desc Fetch a single product by id, Delete a product,  update a product
// @route GET /api/products/:id
// @access PUBLIC & PRIVATE/ADMIN
router
  .route("/:id")
  .get(getProductById)
  .delete(protectRoute, isAdmin, deleteProduct)
  .put(protectRoute, isAdmin, updateProduct);

// @desc Create a product review
// @route POST /api/products/:id/reviews
// @access PRIVATE
router.route("/:id/reviews").post(protectRoute, createProductReview);

router.route("/createcategory").post(createCategory);
router.route("/category").post(getCategory);
router.route("/category/:id").post(getCategoryById);
router.route("/categoryDelete/:id").post(deleteCategory);
router.route("/categoryUpdate/:id").post(updateCategory);
router.route("/createWishlist").post(createWishlist);
router.route("/getWishlist").post(getWishlistForUser);
router.route("/removeProductWishlist").post(removeProductForUser);
router.route("/test").post((req, res) => {
  var filename = "/site/images/test.pdf";
  if (/\.(jpe?g|png|gif|bmp)$/i.test(filename)) {
    console.log("helloo");
  }
  else{
	  console.log('hi')
  }
});

export default router;
