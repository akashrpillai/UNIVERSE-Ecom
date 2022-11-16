const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
// const cors = require('cors')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
// const dotenv = require('dotenv');
const path = require('path');
const errorMiddleware = require("./middleware/error");

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: 'backend/config/config.env' })

}

// Middleware to get json data.
app.use(express.json());

// cors error
// app.use(cors());

// To parse Cookie
app.use(cookieParser());

//For image Upload
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const productRoute = require('./routes/productRoutes');
const userRoute = require('./routes/userRoutes');
const orderRoute = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoute");

app.use('/api/v1', productRoute)
app.use('/api/v1', userRoute)
app.use('/api/v1', orderRoute)
app.use('/api/v1', payment)

// To serve deployment build FOR DEPLOYMENT
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
})

// console.log("path",path.join(__dirname,'../frontend/build/index.html'))

// Middleware for Error
app.use(errorMiddleware)

module.exports = app