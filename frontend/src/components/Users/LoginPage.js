import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSelector, useDispatch } from "react-redux";
import { login, clearError } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layouts/loader/Loader"
import MetaData from '../layouts/MetaData';

const LoginPage = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState({
        password: "",
        showPassword: false,
    });
    const { password, showPassword } = loginPassword;
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, password))
        console.log("form submitted")
    }
    const loginTab = useRef(null);

    const handlePasswordChange = (event) => {
        const { target: { name, value } } = event
        setLoginPassword({ ...loginPassword, [name]: value });
    };
    //Show or Hide Password
    const handleClickShowPassword = () => {
        setLoginPassword({ ...loginPassword, showPassword: !showPassword });
    };

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    // To get The query For Shipping After Checkout From Cart Component
    const queryParams = new URLSearchParams(window.location.search)
    const term = queryParams.get("redirect")
    const redirect = term ? `/${term}` : "/account"
    // console.log(redirect)


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        if (isAuthenticated) {
            if (redirect === "/account") {
                alert.success("loged in scuccessfully")
            }
            navigate(redirect)
        }


    }, [dispatch, error, alert, isAuthenticated, navigate, redirect])
    return (
        <>
            {loading ? <Loader title={"Logging in"} /> : (<Fragment>
                <MetaData title={`Login | UNIVERSE`} />
                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                        <MailOutlineIcon className='mailIcon' />
                        <input
                            type="email"
                            autoFocus
                            placeholder="Email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            autoComplete='username'
                        />
                    </div>
                    <div className="loginPassword">
                        <LockOpenIcon className='pasIcon' />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            value={password}
                            onChange={handlePasswordChange}
                            name="password"
                            autoComplete='current-password'
                        />
                        <span className="showHide" onClick={handleClickShowPassword}>{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
                    </div>
                    <Link to="/password/forgot">Forget Password ?</Link>
                    <input type="submit" value="Login" className="loginBtn" />
                </form>
            </Fragment>)}

        </>
    )
}

export default LoginPage