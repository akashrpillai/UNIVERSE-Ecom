const ErrorHandler = require('../utils/errorHandler')
const CatchAsyncErrors = require('../middleware/catchAsyncError')
const User = require("../models/userModel")
const sendToken = require('../utils/JWTtokens')
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary")



// Register New User
exports.registerUser = CatchAsyncErrors(async (req, res, next) => {

    const { name, email, password, avatar } = req.body
    const createUser = {
        name,
        email,
        password
    };
    if (avatar !== "") {
        // Adding New Image
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "usersDP",
            width: 400,
            height: 400,
        });

        createUser.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.url
        }

    }

    const user = await User.create(createUser);

    // Geting Jwt Token After user is Registered
    sendToken(user, 201, res)
})

// Login user
exports.loginUser = CatchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if Both email and password is given

    if (!email || !password) {
        return next(new ErrorHandler("Please Provid a valid email and password", 400))
    }

    const user = await User.findOne({ email }).select("+password"); //(+password)=>to get the password also which is set to false bydefault


    if (!user) {
        return next(new ErrorHandler("invalid Email or Password ", 401))
    }

    // matching password
    const matchPassword = await user.comparePassword(password)
    if (!matchPassword) {
        return next(new ErrorHandler("invalid Email or Password ", 401))
    }

    //  Geting Jwt Token After user is successfully loged In
    sendToken(user, 200, res)


});

// Logout user
exports.logoutUser = CatchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "Logged Out Successfully"
    });


});

// Forgot Password
exports.forgotPassword = CatchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }
    const resetToken = user.generateResetToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`; // Orignal URL
    // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`; // Development Only
    const message = `Please use the following link to Reset your Password \n\nRESET LINK :- ${resetPasswordUrl} \n\n If you didn't request this , you can safely ignore this email.Someone else might have typed your email address by mistake.
    \n\n Thanks \n UNIVERSE-Ecom`

    try {
        await sendEmail({
            email: user.email,
            subject: "PASSWORD-Recovery UNIVERSE(From ARP Groups)",
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

//Reset Password
exports.resetPassword = CatchAsyncErrors(async (req, res, next) => {

    // Creating Token Hash to verify the resetToken
    resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    // console.log(resetPasswordToken)
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });
    // console.log(user)
    if (!user) {
        return next(new ErrorHandler("Reset password Token is Invalid or has been Expired ", 400));
    }
    
    if (req.body.password !== req.body.confirmpassword) {
        return next(new ErrorHandler("Password doesn't Match ", 400));
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, 200, res)

})

// Get Individual user Details after user is loged in 
exports.getUserDetails = CatchAsyncErrors(async (req, res, next) => {
    // console.log(req.user.id, "and _id", req.user._id)
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
})

// change password for individual user after user is loged in
exports.changePassword = CatchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    // matching password with old password
    const matchPassword = await user.comparePassword(req.body.oldPassword)
    // console.log(matchPassword)
    if (!matchPassword) {
        return next(new ErrorHandler("old passoword doesn't match", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passoword doesn't match", 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res)

})

// udpdate Individual user porfile
exports.updateUser = CatchAsyncErrors(async (req, res, next) => {
    const { name, email, avatar } = req.body
    const updatedUserDetails = {
        name,
        email
    };

    // If  User image is Updated
    if (avatar !== "") {
        const user = await User.findById(req.user.id);
        // Deleting Existing Image From Cloudinary
        const imageId = user.avatar.public_id;
        if (imageId !== "DefaultImage/emptyProfile_wqocif") {
            // only if its not default image
            await cloudinary.v2.uploader.destroy(imageId);
        }

        // Addign Updated Image
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "usersDP",
            width: 400,
            height: 400,
        });

        updatedUserDetails.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.url
        }

    }
    await User.findByIdAndUpdate(req.user.id, updatedUserDetails, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        // user
    });

})





// Get All the users -- Admin
exports.getAllusersByAdmin = CatchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });
})

// Get Individual user details -- Admin
exports.getSingleUserByAdmin = CatchAsyncErrors(async (req, res, next) => {
    const userDetails = await User.findById(req.params.id);

    if (!userDetails) {
        return next(new ErrorHandler(`User with id ${req.params.id} doesn't Exists`, 400))
    }

    res.status(200).json({
        success: true,
        userDetails
    });
})

// udpdate Role of user -- Admin
exports.updateUserRoleAdmin = CatchAsyncErrors(async (req, res, next) => {
    const { name, email, role } = req.body
    const updatedUserDetails = {
        name,
        email,
        role
    };
    // console.log("req.body", req.body, "updateuserdetails", updatedUserDetails)
    const updateUserRole = await User.findByIdAndUpdate(req.params.id, updatedUserDetails, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    if (!updateUserRole) {
        return next(new ErrorHandler(`User with id ${req.params.id} doesn't Exists`, 400))
    }
    res.status(200).json({
        success: true,
        updateUserRole
    });

})

// Delete user -- Admin
exports.deleteUserAdmin = CatchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User with id ${req.params.id} doesn't Exists`, 400))
    }

    // Deleting Existing Image From Cloudinary
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove()

    res.status(200).json({
        success: true,
        message: "User Deleted successfully",
        user
    });

})

