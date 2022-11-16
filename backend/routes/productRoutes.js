const express = require('express');
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReviews, getAllProductsAdmin } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authorization');
const router = express.Router()


// creating New Product {POST Method} -- Admin
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct)

// get All Products {GET method} 
router.route('/products').get(getAllProduct)

// get All Products {GET method}  -- Admin
router.route('/admin/products').get(isAuthenticatedUser,authorizeRoles("admin"),getAllProductsAdmin)

// get A single Product {GET method}
router.route('/product/:id').get(getProductDetails)

// update product {PUT Method} -- Admin
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)

// Delete a Product {DELETE Method} -- Admin  
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)

// Add or update Review
router.route("/review").put(isAuthenticatedUser,createProductReview)

// To get All Reviews
router.route("/reviews").get(getProductReviews)

// To delete a review
router.route("/reviews").delete(isAuthenticatedUser,deleteReviews)

// get,put,and delete since route is same 
// router.route('/product/:id').get(getProductDetails).put(updateProduct).delete(deleteProduct)



module.exports = router;   
