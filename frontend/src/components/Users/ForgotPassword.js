import React, { useState, useEffect, Fragment } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { forgotPassword, clearError } from "../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layouts/loader/Loader"
import MetaData from '../layouts/MetaData';
import "./forgotPassword.css"


const ForgotPassword = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")

    const { loading, message, error } = useSelector((state) => state.forgotPassword);
    console.log(message)
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearError())

        }

        if (message) {
            alert.success(message);
        }


    }, [dispatch, error, alert, message])


    return (
        <Fragment>
            {loading ? <Loader /> : (<Fragment>
                <MetaData title={`Update Profile`} />
                <div className="forgotPasswordContainer">
                    <div className="forgotPasswordBox">
                        <h2 className='forgotPasswordHeading'>Let's get you into your account</h2>
                        <form
                            className="forgotPasswordForm"
                            encType="multipart/form-data"
                            onSubmit={forgotPasswordSubmit}
                        >   <div className="forgotPasswordMsg">
                                <h3>Enter Your Registered Email Id</h3>
                                <p> An Email will be Sent To Your Mail Id To Reset Your Password </p>
                            </div>
                            <div className="forgotPasswordEmail">
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    autoComplete="username"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </div>
                            <input type="submit" value="Send" className="forgotPasswordBtn" />
                        </form>
                    </div>
                </div>

            </Fragment>)}
        </Fragment>
    )
}

export default ForgotPassword