import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import "./loader.css"

const loader = ({ title }) => {
    return (
        <Fragment>
            <div className='loadingbody'>
                {title ? (<div className="spinner-box">
                    {<Typography variant='h5'>{title}</Typography>}
                    <div className="pulse-container">
                        <div className="pulse-bubble pulse-bubble-1"></div>
                        <div className="pulse-bubble pulse-bubble-2"></div>
                        <div className="pulse-bubble pulse-bubble-3"></div>
                    </div>
                </div>) : (
                    <div className="spinner-box">
                        <div className="blue-orbit leo">
                        </div>

                        <div className="green-orbit leo">
                        </div>

                        <div className="red-orbit leo">
                        </div>

                        <div className="white-orbit w1 leo">
                        </div><div className="white-orbit w2 leo">
                        </div><div className="white-orbit w3 leo">
                        </div>
                    </div>)}



            </div>
        </Fragment>
    )
}

export default loader