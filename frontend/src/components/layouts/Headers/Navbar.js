import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { ImCart } from 'react-icons/im'
import { BsSearch } from 'react-icons/bs'
import { GoThreeBars } from 'react-icons/go'
import { VscChromeClose } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import "./navbar.css"
import AlertLogOut from './AlertModal'
import { useSelector } from "react-redux";
import Badge from '@mui/material/Badge';

const Navbar = ({ isAuthenticated, user }) => {
  // console.log(isAuthenticated,user)
  const navigate = useNavigate();
  const [keyword, setkeyword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const searchSubmitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      setkeyword("")
      navigate(`/products/${keyword}`)
    }
    else {

      navigate("/products")
    }
  }
  // setIsActive(current => !current);

  return (
    <>
      {/* <input type="checkbox" id="check" /> */}
      <nav className='mainNavMenu'>
        <div className="logo"><Link to="/">UNIVERSE</Link></div>
        <div className="search_box">
          <form onSubmit={searchSubmitHandler}>
            <input type="search" placeholder='Looking For SomeThing ?' value={keyword} onChange={(e) => { setkeyword(e.target.value) }} />
            <span> <BsSearch style={{ marginTop: "7px" }} /></span>
          </form>
        </div>
        <ol className={isActive ? "show" : ""}>
          <li> <NavLink to="/products">Products</NavLink></li>
          {/* <li><NavLink to="/about">About</NavLink></li> */}
          <li><NavLink to="/contact">Contact</NavLink></li>
          {isAuthenticated ? (<li><NavLink to="/account" className='profile'><FaUser />My Profile</NavLink></li>) : (<li><NavLink to="/user" className='profile'><FaUser />Login</NavLink></li>)}
          <li><NavLink to="/cart" className='cart'>
            <Badge badgeContent={cartItems.length} color="primary"><ImCart /></Badge>Cart</NavLink>
          </li>
          {isAuthenticated && <li className="logoutnav" ><AlertLogOut /></li>}
        </ol>
        {/* <label htmlFor="check" className='bar'>
          <span><GoThreeBars id='bars' /></span>
          <span><VscChromeClose id='times' /></span>
        </label> */}
        <div className={`bar${isActive ? " responsive" : ""}`} onClick={() => { setIsActive(!isActive) }}>
          <span><GoThreeBars id='bars' /></span>
          <span><VscChromeClose id='cross' /></span>
        </div>
      </nav>
    </>
  )
}

export default Navbar