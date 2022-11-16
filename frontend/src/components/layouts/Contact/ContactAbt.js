import React from "react";
import "./contactabt.css";
import { Button, Typography, Avatar } from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from "@mui/icons-material/Instagram";
const ContactAbt = () => {
    const visitInstagram = () => {
        window.location = "https://instagram.com/meabhisingh";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">Contact Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/dhrktkgsl/image/upload/v1668085494/usersDP/IMG_20181008_073835_817_tfmhy0.jpg"
                            alt="Founder"
                        />
                        <Typography>CEO : Akash R Pillai</Typography>
                        <Button onClick={visitInstagram} color="primary">
                            Visit Instagram
                        </Button>
                        <span>
                            UNIVERSE is a ecommerce website for buying and selling
                            goods online UNIVERSE - Ecom is one of its kind Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium iusto officiis fugit natus consequuntur debitis autem sit sequi impedit repellat.
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Help Line</Typography>
                        <Typography component="p" variant="overline">+91-9871310857</Typography>
                        <Typography component="p" variant="subtitle1">+100-10071007 (Toll Free)</Typography>
                        <a
                            href="https://www.youtube.com"
                            target="blank"
                        >
                            <YouTubeIcon className="youtubeSvgIcon" />
                        </a>

                        <a href="https://instagram.com/akash_r_pillai" target="blank">
                            <InstagramIcon className="instagramSvgIcon" />
                        </a>
                        <a className="mailBtn" href="mailto:akashrpillai208@gmail.com">
                            <Button>Contact: UNIVERSE@support.com</Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactAbt;