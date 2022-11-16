const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxlength: [30, "Name should not exceed 30 characters"],
        minlength: [4, "Name should be more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: [true, "This email is already Resgisterd."],
        validate: [validator.isEmail, "Please Enter A Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minlength: [8, "Password should be atleast 8 characters"],
        select: false // To exclude this Field on Find method
    },
    avatar: {

        public_id: {
            type: String,
            default:"DefaultImage/emptyProfile_wqocif",
            required: true
        },
        url: {
            type: String,
            default:"https://res.cloudinary.com/dhrktkgsl/image/upload/v1668174441/DefaultImage/defaultuserImage.png_l7b8kw.png",
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,


})

// Hashing Password Bcrypt
userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();

})

// JWT Token Generation
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

}
// Compare Password  Bcrypt
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);

}
// Generating RESET password Token
userSchema.methods.generateResetToken = function () {

    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and Adding To resetPassword in UserSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    
    return resetToken;

}

const User = mongoose.model('User', userSchema)
module.exports = User