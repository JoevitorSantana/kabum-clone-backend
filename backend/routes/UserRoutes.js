const express = require('express');
const { createUser, loginUser, logoutUser, forgotPassword, resetPassword, userDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser, updateShippingInfo, updatePaymentInfo } = require('../controller/UserController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoutes} = require('../middleware/auth')

router.route('/registration').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update/info').put(isAuthenticatedUser, updateProfile);
router.route('/me').get(isAuthenticatedUser, userDetails);
router.route('/me/update/shippinginfo').put(isAuthenticatedUser, updateShippingInfo);
router.route('/me/update/paymentinfo').put(isAuthenticatedUser, updatePaymentInfo);
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoutes("admin"), getAllUsers);
router.route('/admin/users/:id').get(isAuthenticatedUser, authorizeRoutes("admin"), getSingleUser);
router.route('/admin/user/:id').put(isAuthenticatedUser, authorizeRoutes("admin"), updateUserRole);
router.route('/admin/users/:id').delete(isAuthenticatedUser, authorizeRoutes("admin"), deleteUser);

module.exports = router;