import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layouts/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearError, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Tooltip from '@mui/material/Tooltip';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()
    const {token} = useParams();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [visibility, setVisibility] = useState(false);

    const resetPasswordSubmit = (e) => {

        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", Password);
        myForm.set("confirmpassword", confirmPassword);

        dispatch(resetPassword(token,myForm));
    };

    //Show or Hide Password
    const handleClickShowPassword = () => {
        setVisibility(!visibility);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (success) {
            alert.success("Password Updated Successfully");
            navigate("/user/login");
        }
    }, [dispatch, error, alert, navigate, success]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Change Password" />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Reset Password</h2>

                            <form
                                className="updatePasswordForm"
                                onSubmit={resetPasswordSubmit}
                            >
                                <Tooltip title="Password must be more than 8 Characters">
                                    <div className="loginPassword">
                                        <LockOpenIcon />
                                        <input
                                            type={visibility ? "text" : "password"}
                                            placeholder="New Password"
                                            required
                                            value={Password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span className="showHide" onClick={handleClickShowPassword}>{visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
                                    </div>
                                </Tooltip>

                                <div className="loginPassword">
                                    <LockIcon />
                                    <input
                                        type={visibility ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <span className="showHide" onClick={handleClickShowPassword}>{visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
                                </div>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="updatePasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ResetPassword