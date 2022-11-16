import React from 'react';
import { ReactNavbar } from "overlay-navbar";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa"
import logo from "../../../images/universe-logo.png"

const Header = () => {
    const options = {
        burgerColorHover: "#5591a9",
        logo: logo,
        logoWidth: "20vmax",
        navColor1: "#054569",
        logoHoverSize: "10px",
        logoHoverColor: "#5591a9",
        link1Text: "Home",
        link2Text: "Products",
        link3Text: "Contact",
        link4Text: "About",
        link1Url: "/",
        link2Url: "/products",
        link3Url: "/contact",
        link4Url: "/about",
        link1Size: "1.3vmax",
        link1Color: "rgba(35, 35, 35,0.8)",
        nav1justifyContent: "flex-end",
        nav2justifyContent: "flex-end",
        nav3justifyContent: "flex-start",
        nav4justifyContent: "flex-start",
        link1ColorHover: "#5591a9",
        link1Margin: "1vmax",
        link1AnimationTime:"1",
        link2AnimationTime:"1.1",
        link3AnimationTime:"1.2",
        link4AnimationTime:"1.3",
        profileIconUrl: "/login",
        profileIconColor: "rgba(35, 35, 35,0.8)",
        searchIconColor: "rgba(35, 35, 35,0.8)",
        cartIconColor: "rgba(35, 35, 35,0.8)",
        profileIconColorHover: "#5591a9",
        searchIconColorHover: "#5591a9",
        cartIconColorHover: "#5591a9",
        cartIconMargin: "1vmax",
        profileIcon: "true",
        cartIcon: "true",
        searchIcon: "true",
        ProfileIconElement: FaUser,
        profileIconSize: "2vmax",
        CartIconElement: FaShoppingCart,
        SearchIconElement: FaSearch,
        searchIconAnimationTime:"1",
        cartIconAnimationTime:"1.5",
        profileIconAnimationTime:"1.7"
    };
    return (
        <>
            <ReactNavbar {...options} />
        </>
    )
}

export default Header