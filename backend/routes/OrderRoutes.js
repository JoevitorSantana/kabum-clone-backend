const express = require('express');
const { createOrder, getSingleOrder, getAllOrders, getAdminAllOrders, updateAdminOrder, deleteOrder } = require('../controller/OrderController');
const { isAuthenticatedUser, authorizeRoutes } = require('../middleware/auth');

const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser, createOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, getAllOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoutes("admin"), getAdminAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoutes("admin"), updateAdminOrder)
  .delete(isAuthenticatedUser, authorizeRoutes("admin"), deleteOrder);


module.exports = router;