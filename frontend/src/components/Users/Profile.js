import React, { Fragment, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/loader/Loader'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import ViewListIcon from '@mui/icons-material/ViewList';
import LockResetIcon from '@mui/icons-material/LockReset';
import Tooltip from '@mui/material/Tooltip';
import "./profile.css"

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate()
    // console.log(`${loading ? "loading.." : user.name}`,isAuthenticated)
    useEffect(() => {
        if (loading === false && isAuthenticated === false) {
            navigate("/user")
        }

    }, [loading,isAuthenticated,navigate])


    return (
        <Fragment>
            {loading ? (<Loader />) : (<Fragment>
                <MetaData title={`${(user.name)}'s Profile`} />
                <div className="profileContainer">
                    <div className="profileBox">
                        <div className="displayPicture">
                            <h2>{`My ${user.role ? (user.role).toUpperCase() : ""} Profile`}</h2>
                            <img src={user.avatar.url} alt="DisplayPic" />
                            <Link to="/me/update"><Tooltip title="Edit Profile" placement="right"><EditIcon /></Tooltip></Link>
                        </div>
                        <div className="userinfo">
                            <div className="name">
                                <h3>Name</h3>
                                <p>{user.name}</p>
                            </div>
                            <div className="email">
                                <h3>Email</h3>
                                <p>{user.email}</p>
                            </div>
                            <div className='joinDetails'>
                                <h3>Joined On</h3>
                                <p>{String(user.createdAt).slice(0, 10)}</p>
                            </div>
                        </div>
                        <div className='links'>
                            <div className="orders">
                                <ViewListIcon /> <Link to="/orders">My Orders</Link>
                            </div>
                            <div className="forgetpassword">
                                <LockResetIcon /><Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>)
            }
        </Fragment >
    )
}

export default Profile