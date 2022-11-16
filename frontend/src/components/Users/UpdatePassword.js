import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layouts/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearError, updateUserPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConst";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Tooltip from '@mui/material/Tooltip';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [visibility, setVisibility] = useState(false);

    const updatePasswordSubmit = (e) => {

        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updateUserPassword(myForm));
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

        if (isUpdated) {
            alert.success("Password Updated Successfully");

            navigate("/account");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, alert, navigate, isUpdated]);
    

    return (
        <Fragment>
            {loading ? (
                <Loader title={"Updating Password"} />
            ) : (
                <Fragment>
                    <MetaData title="Change Password" />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Change Password</h2>

                            <form
                                className="updatePasswordForm"
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className="loginPassword">
                                    <VpnKeyIcon />
                                    <input
                                        autoFocus
                                        type={visibility ? "text" : "password"}
                                        placeholder="Old Password"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                    <span className="showHide" onClick={handleClickShowPassword}>{visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
                                </div>
                                <Tooltip title="Password must be more than 8 Characters">
                                    <div className="loginPassword">
                                        <LockOpenIcon />
                                        <input
                                            type={visibility ? "text" : "password"}
                                            placeholder="New Password"
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
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
    );
};

export default UpdatePassword;
