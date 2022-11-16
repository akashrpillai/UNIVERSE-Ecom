const app = require('./app');
// const dotenv = require('dotenv');
const cloudinary = require("cloudinary")
const connectDatabase = require("./database/database");

// Handeling Uncaught Exception {eg:for not defined variables etc}
process.on("uncaughtException", (error) => {
    console.log(`Error:${error.message}`)
    console.log('Shutting Down The Server due To Uncaught Exception')
    process.exit(1)
})

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: 'backend/config/config.env' })
}

// connecting To DatatBase
connectDatabase()

//cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Listen
const server = app.listen(process.env.PORT, () => {
    console.log(`server is working at http://localhost:${process.env.PORT}`)
})



// Unhandled Promise Rejections // eg{"mongoDb => change name"}
process.on("unhandledRejection", (error) => {
    console.log(`Error:${error.message}`)
    console.log('Shutting Down The Server due To unHandlePromise Rejections')
    server.close(() => {
        process.exit(1)
    });
});