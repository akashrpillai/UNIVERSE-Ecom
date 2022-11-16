const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/authorization');

// Payment request
router.route("/payment/process").post(isAuthenticatedUser,processPayment);

//sending api key for stripe 
router.route("/stripeapikey").get(isAuthenticatedUser,sendStripeApiKey);

module.exports = router;