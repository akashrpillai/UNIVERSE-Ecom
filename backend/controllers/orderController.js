const Order = require("../models/orderModel")
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const CatchAsyncErrors = require('../middleware/catchAsyncError')


// Create New order
exports.createNewOrder = CatchAsyncErrors(async (req, res, next) => {
    // console.log("req.body=>", req.body)
    const { shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    // console.log("userid", req.user._id)
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        order
    })

});

// Get single order with user name and email 
exports.getUserOrders = CatchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("order with this Id is not found", 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

//When user wants to see all their Orders
exports.getMyorders = CatchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({
        success: true,
        orders
    });
});

// Get All Orders -- Admin
exports.getAllOrdersAdmin = CatchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
    // To find the total amount
    let totalAmount = 0
    orders.forEach((order) => {
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

// Update Order Status -- Admin
exports.updateStatusAdmin = CatchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("order with this Id is not found", 404));
    }
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Order is Already Delivered", 400));
    }
    // decrease the no of quantity of product after shipping
   
    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (order) => {
            await updateStocks(order.productId, order.quantity);
        });
    }

    order.orderStatus = req.body.status
    if (req.body.status === "Delivered") {
        order.deliverdAt = Date.now()
    }
    await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        // order
    });
});

// Delete order -- Admin
exports.deleteOrdersAdmin = CatchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("order with this Id is not found", 404));
    }

    await order.remove()

    res.status(200).json({
        success: true,
        message: "order Deleted Successfully"
    });
});

//UpdateStock Function For updating Stocks in Product Collection
async function updateStocks(productId, quantity) {
   
    const product = await Product.findById(productId);
  
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false })
}