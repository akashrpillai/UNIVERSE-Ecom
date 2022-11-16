import React from "react";
import ErrorIcon from '@mui/icons-material/Error';
import "./notfound.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import NotFoundImg from "../../../images/notfound2.gif"
const NotFound = () => {
    return (
        <div className="PageNotFound">
            <Typography> 404 </Typography>
            {/* <img src={NotFoundImg} alt="notfound" /> */}
            <ErrorIcon />
            <Typography>Page Not Found </Typography>
            <Link to="/">Home</Link>
        </div>
    );
};

export default NotFound;