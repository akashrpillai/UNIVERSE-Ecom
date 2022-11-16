const CatchAsyncErrors = require('../middleware/catchAsyncError');
const stripe = require('stripe')(process.env.STRIPE_SECTERT_KEY);

exports.processPayment = CatchAsyncErrors(async (req, res, next) => {
    // console.log("req.body=>",req.body,"and",req.body.amount)
    const payment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "UNIVERSE-Ecommerce",
        },

    });
    res.status(200).json({ success: true, client_secret: payment.client_secret });
}); 

exports.sendStripeApiKey = CatchAsyncErrors(async(req,res,next)=>{
    res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY});
});