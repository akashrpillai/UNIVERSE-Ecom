import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getUserDetails, updateUser } from "../../actions/userAction"
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layouts/MetaData";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MailIcon from '@mui/icons-material/Mail';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import SideBar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import "./newProduct.css";
import Loader from "../layouts/loader/Loader";
import { UPDATE_USER_RESET } from "../../constants/userConst";


const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { userId } = useParams();
    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);
    // console.log("loading=>", loading, "succ", success)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearError()); 
        }
        if (isUpdated) {
            alert.success("User's Role Updated Successfully");
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, navigate, isUpdated, updateError, userId, user]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
        dispatch(updateUser(userId, myForm));
    };
    return (
        <Fragment>
            <MetaData title="Update User | UNIVERSE" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {loading || updateLoading ? (<Loader title={updateLoading && "Updating User"} />) : (<form
                        className="createProductForm"
                        onSubmit={updateUserSubmitHandler}
                    >

                        <h1>Update User</h1>

                        <div>
                            <AccountBoxIcon />
                            <input
                                type="text"
                                placeholder="User Name"
                                required
                                value={name}
                                readOnly
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <MailIcon />
                            <input
                                type="text"
                                placeholder="email"
                                required
                                value={email}
                                readOnly
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            {role === "admin" ? <AdminPanelSettingsOutlinedIcon /> : <SupervisorAccountIcon />}
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Choose Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={updateLoading ? true : false || role === "" ? true : false}
                        >
                            Update
                        </Button>
                    </form>)}
                </div>

            </div>
        </Fragment>
    )
}

export default UpdateUser;