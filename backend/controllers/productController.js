const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const CatchAsyncErrors = require('../middleware/catchAsyncError')
const ApiFeatures = require('../utils/apifeatures')
const cloudinary = require("cloudinary");



// Creating New Product -- Admin
exports.createProduct = CatchAsyncErrors(async (req, res) => {

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images); // Only single image is Present
    }
    else {
        images = req.body.images  //Multiple images 
    }
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "ProductImages",
            width: 350,
            height: 350,
        });
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })

    }
    req.body.images = imagesLinks
    req.body.user = req.user.id // when authenticated req.user has user details

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})


// Get All Products
exports.getAllProduct = CatchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 8
    const productCounts = await Product.countDocuments()
    // ==> Product.find({ name: { '$regex': '3', '$options': 'i' } })
    const apifeatures = new ApiFeatures(Product.find(), req.query).search().filter()

    let products = await apifeatures.query.clone();
    let filteredProductsCount = products.length;
    apifeatures.pagination(resultPerPage)

    products = await apifeatures.query

    res.status(201).json({
        success: true,
        products,
        resultPerPage,
        productCounts,
        filteredProductsCount
    })
});

// Get All Products (ADMIN)
exports.getAllProductsAdmin = CatchAsyncErrors(async (req, res, next) => {
    const products = await Product.find()
    res.status(201).json({
        success: true,
        products,
    })
});


// Get a single product Details
exports.getProductDetails = CatchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    else {
        res.status(200).json({
            success: true,
            product
        })
    }
});


// Update Product -- Admin
exports.updateProduct = CatchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    // updating images
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images); // Only single image is Present
    }
    else {
        images = req.body.images  //Multiple images 
    }
    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false });

    res.status(200).json({
        success: true,
        product
    })

})


// Delete Product -- Admin
exports.deleteProduct = CatchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    // remove images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);

    }
    await product.remove() // delete the product

    res.status(200).json({
        success: true,
        Message: "Product Deleted Successfully"
    })
})

// Create ProductReview or Update ProductReview
exports.createProductReview = CatchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,       //==> _id = new ObjectId("63135eb92e1744fce4c4e725")
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((review) => {
        return review.user.toString() === req.user._id.toString()
    });

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.name = req.user.name;
                rev.rating = rating;
                rev.comment = comment;
            }
        })
    }
    else {
        product.reviews.push(review);

        //Total no of reviews
        product.numOfreview = product.reviews.length
    }
    // Overall Ratings
    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating

    })
    rounded = Math.round(((avg / product.reviews.length) + Number.EPSILON) * 100) / 100;
    product.ratings = rounded

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        message: "Review Added Successfully"
    })
})

// Get all Reviews of a Product
exports.getProductReviews = CatchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete a review
exports.deleteReviews = CatchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter((rev) => {
        return rev._id.toString() !== req.query.id.toString()
    })
    // new Avg  Ratings of the product
    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating

    })

    // new Rating
    let ratings = 0;
    // if only one review is present 
    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    // new numofreview
    const numOfreview = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,
        {
            reviews,
            ratings,
            numOfreview
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})