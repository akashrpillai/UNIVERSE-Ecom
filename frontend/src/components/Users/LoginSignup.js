import React, { Fragment, useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import "./loginsignup.css"

const LoginSignup = () => {
    const switcherTab = useRef(null);

    const switchToLogin = () => {
        switcherTab.current.classList.add("shiftToNeutral");
        switcherTab.current.classList.remove("shiftToRight");
    }
    const switchToRegister = () => {
        switcherTab.current.classList.add("shiftToRight");
        switcherTab.current.classList.remove("shiftToNeutral");

    }
    const NavStyle = ({ isActive }) => {
        return {
            color: isActive ? "var(--main3)" : "",
            fontWeight: isActive ? "bold" : "",
        }
    }
    return (
        <Fragment>
            <div className="LoginSignupContainer">
                <div className="LoginSignUpBox">
                    <div>
                        <nav className="login_signUp_toggle">
                            <NavLink to="login" style={NavStyle} onClick={switchToLogin}>Login</NavLink>
                            <NavLink to="register" style={NavStyle} onClick={switchToRegister}>Register</NavLink>
                        </nav>
                        <button ref={switcherTab}></button>
                    </div>
                    <Outlet />
                </div>
            </div>
        </Fragment>
    )
}

export default LoginSignup