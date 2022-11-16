import React, { useState, useEffect, Fragment } from 'react'
import FaceIcon from '@mui/icons-material/Face';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useNavigate } from "react-router-dom"
import { loadUser, updateProfile, clearError } from "../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layouts/loader/Loader"
import MetaData from '../layouts/MetaData';
import { UPDATE_PROFILE_RESET } from '../../constants/userConst';
import "./EditProfile.css"



const EditProfile = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState("/emptyprofile.jpg")

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);

  };

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setAvatarPreview(user.avatar.url)
    }

    if (error) {
      alert.error(error);
      dispatch(clearError())

    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser())
      navigate("/account")
      dispatch({
        type: UPDATE_PROFILE_RESET
      })
    }


  }, [dispatch, error, alert, user, isUpdated, navigate])


  return (
    <Fragment>
      {loading ? <Loader /> : (<Fragment>
        <MetaData title={`Update Profile`} />
        <div className="updateProfileContainer">
          <div className="updateProfileBox">
            <h2 className='updateProfileHeading'>Update Profile</h2>
            <form
              className="updateProfileForm"
              encType="multipart/form-data"
              onSubmit={updateProfileSubmit}
            >
              <div className="editImage">
                <label>
                  <img src={avatarPreview} className="user" alt="Avatar Preview" />
                  <span className="camera"><InsertPhotoIcon /></span>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </label>
              </div>
              <div className="updateProfileName">
                <FaceIcon />
                <input
                  autoFocus
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => { setName(e.target.value) }}
                />
              </div>
              <div className="updateProfileEmail">
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
              <input type="submit" value="Update" className="updateProfileBtn" />
            </form>
          </div>
        </div>

      </Fragment>)}
    </Fragment>

  )
}

export default EditProfile