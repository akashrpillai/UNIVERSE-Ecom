import React from 'react'
import Appstore from "../../../images/Appstore.png";
import Playstore from "../../../images/playstore.png";
import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="leftfooter">
                <h2>DOWNLOAD OUR APP NOW</h2>
                <p>Donwload app for android and ios</p>
                <img src={Playstore} alt="playstorebanner" />
                <img src={Appstore} alt="appstorebanner" />
            </div>
            <div className="midfooter">
                <h1> UNIVERSE - <span>Get Everythig You Want</span> </h1>
                <p>The World Class Ecommerce Website From ARP Groups</p>
                <p>Copyrights {new Date().getFullYear()} &copy; ARP PVT LTD</p>
            </div>
            <div className="rightfooter">
                <h3>Contact Us</h3>
                <a href="https://www.instagram.com/akash_r_pillai/?hl=en" rel="noreferrer" target="_blank"> <FaInstagram size={"2rem"}  color="white"/> </a>
                <a href="https://in.linkedin.com/in/akash-r-pillai-b28a16249" rel="noreferrer" target="_blank"> <FaLinkedin size={"2rem"} color="#0A66C2"/> </a>
                <a href="https://mail.google.com/" rel="noreferrer" target="_blank"> <FaEnvelope size={"2rem"} color="#BB001B"/> </a>
            </div>
        </footer>
    )
}

export default Footer