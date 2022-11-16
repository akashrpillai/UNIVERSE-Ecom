import React from 'react'
import "./orderSuccess.css"
import { Link } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';

const OrderSuccess = () => {
    return (
        <div className="page-wrapper">
            <div className="circle-wrapper">
                <div className="success circle"></div>
                <div className="icon">
                    <CheckIcon />
                </div>
            </div>
            <p>Congratulations Your Order is  Successfully Placed</p>
            <Link to="/orders">View Order</Link>
        </div>
    )
}

export default OrderSuccess;