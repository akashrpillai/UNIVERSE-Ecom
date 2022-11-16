const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authorization');
const { createNewOrder, getUserOrders, getMyorders, updateStatusAdmin, getAllOrdersAdmin, deleteOrdersAdmin } = require("../controllers/orderController");

// create New order
router.route("/order/new").post(isAuthenticatedUser, createNewOrder)

// get order detailsof  users with Order Id
router.route("/order/:id").get(isAuthenticatedUser, getUserOrders)

//get all  orders of a particular user 
router.route("/orders/me").get(isAuthenticatedUser, getMyorders)

//Get All orders -- {Admin}
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrdersAdmin)

//Update order status -- {Admin}
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateStatusAdmin)

//Delete orders -- {Admin}
router.route("/admin/order/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrdersAdmin)


module.exports = router;