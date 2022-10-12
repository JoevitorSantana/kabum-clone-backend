const express = require("express");
const { trackDelivery } = require("../controller/CalculoFrete");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, createProductReview, getSingleProductReviews, deleteReview, getAdminProducts } = require("../controller/ProductController");
const { isAuthenticatedUser, authorizeRoutes } = require("../middleware/auth");

const router = express.Router()

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser, authorizeRoutes("admin"), createProduct);
router
    .route("/product/:id")
    .delete(isAuthenticatedUser, authorizeRoutes("admin"), deleteProduct)
    .put(isAuthenticatedUser, authorizeRoutes("admin"), updateProduct)
    .get(getSingleProduct)


router.route("/product/review").post(isAuthenticatedUser, createProductReview);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoutes("admin"), getAdminProducts);

router
  .route("/reviews")
  .get(getSingleProductReviews)
  .delete(isAuthenticatedUser, authorizeRoutes("admin"), deleteReview);

router.route('/entrega').post(trackDelivery);
module.exports = router