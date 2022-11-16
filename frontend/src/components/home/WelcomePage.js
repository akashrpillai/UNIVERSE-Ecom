import React from 'react'
import "./welcome.css"
import Rocket from "../../images/rocket-png-1.png"
import ShootingStar from './ShootingStar'

const WelcomePage = () => {
    return (
        <div className="wrapper">
            <ShootingStar />
            <div className="innerwrapper">
                <p> Why? UNIVERSE </p>
                <div className="words">
                    <span>Latest Products From Trusted Brands</span>
                    <span>Lowest Price Guaranteed</span>
                    <span>Fastest Delivery</span>
                    <span>No Questions Asked Return/Exchange</span>
                    <span>Latest Products From Trusted Brands</span>
                </div>
            </div>
            <div className="banner2">
                <h1>Welcome Abord Captain</h1>
                <p>Ready To Explore Universe ?</p>


                <a href="#container">
                    <button>
                        Let's Go <img  className='rocketlaunch' src={Rocket} alt="rocketimage" />
                    </button>
                </a>
            </div>

        </div>
    )
}

export default WelcomePage