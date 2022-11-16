import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";



const ProtectedRoute = ({ children, adminRoute, redirect = "/user", redirectAdmin = "/user/login", }) => {
    const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  

    if (loading === false && !isAuthenticated) {
        return <Navigate to={redirect} />;
    }

    if (loading === false && adminRoute && user && user.role !== "admin") {
        return <Navigate to={redirectAdmin} /> ;
    }
    if (loading === false && isAuthenticated) {
        return children ? children : <Outlet />;
    }

};

export default ProtectedRoute;

