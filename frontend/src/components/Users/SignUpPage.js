import React, { useState, useEffect, Fragment } from 'react'
import FaceIcon from '@mui/icons-material/Face';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom"
import { register, clearError } from "../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layouts/loader/Loader"
import MetaData from '../layouts/MetaData';



const SignUpPage = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false,
  })
  const { name, email, password, showPassword } = user;

  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState("/emptyprofile.jpg")


  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    // console.log(...myForm)
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleClickShowPassword = () => {
    setUser({ ...user, showPassword: !showPassword });
  };

  const { loading, isAuthenticated, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError())

    }

    if (isAuthenticated) {
      navigate("/account")
    }


  }, [dispatch, error, alert, isAuthenticated, navigate])

  return (
    <Fragment>
      {loading ? <Loader title={"Signing In"} /> : (<Fragment>
        <MetaData title={`Register| UNIVERSE`} />
        <form
          className="signUpForm"
          encType="multipart/form-data"
          onSubmit={registerSubmit}
        >
          <div className="signUpName">
            <FaceIcon />
            <input
              autoFocus
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={registerDataChange}
            />
          </div>
          <div className="signUpEmail">
            <MailOutlineIcon />
            <input
              type="email"
              autoComplete="username"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={registerDataChange}
            />
          </div>
          <div className="signUpPassword">
            <LockOpenIcon />
            <input
              type={showPassword ? "text" : "password"}
              autoComplete='new-password'
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={registerDataChange}
            />
            <span className="showHide" onClick={handleClickShowPassword}>{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
          </div>
          <div id="registerImage">
            <img src={avatarPreview} alt="Avatar Preview" />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={registerDataChange}
            />
          </div>
          <input type="submit" value="Register" className="signUpBtn" />
        </form>
      </Fragment>)}
    </Fragment>

  )
}

export default SignUpPage