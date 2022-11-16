const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, changePassword, updateUser, getAllusersByAdmin, getSingleUserByAdmin, deleteUserAdmin, updateUserRoleAdmin } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authorization');


// Create New user
router.route("/register").post(registerUser)

// Login user
router.route("/login").post(loginUser)

// Forgot Password
router.route("/password/forgot").post(forgotPassword)

// Reset Password => update Password
router.route("/password/reset/:resetToken").put(resetPassword)

// Logout user
router.route("/logout").get(logoutUser)

//Individual User
router.route("/me").get(isAuthenticatedUser, getUserDetails)

//Individual User password update
router.route("/password/update").put(isAuthenticatedUser, changePassword)

//Individual User Details update
router.route("/me/update").put(isAuthenticatedUser, updateUser)

//Get all Registerd users  - {Admin}
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllusersByAdmin)

// Get single user Details - {Admin}
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"),getSingleUserByAdmin)

// Change user Role  - {Admin}  
router.route("/admin/user/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateUserRoleAdmin)

// Delete user  - {Admin} 
router.route("/admin/user/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUserAdmin)

module.exports = router