const mongoose = require('mongoose');

const connecDatabase = () => {
    const DB = process.env.DB_URI;

    // DataBase connection
    mongoose.connect(DB).then((data) => {
        console.log(`mongoDB connection successfull with server:${data.connection.host}`);
    })
    // .catch((err) => {
    //     console.log("connection is not successfull..", err);
    // });

} 
module.exports = connecDatabase