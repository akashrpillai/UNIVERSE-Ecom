import React, { Fragment } from 'react';
import MetaData from '../layouts/MetaData';
import CustomizedSteppers from './CheckoutSteps';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import "./confirmOrder.css"

const ConfirmOrder = () => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const subtotal = cartItems.reduce((acc, item) => {
        return acc + item.quantity * item.price
    }, 0);
    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const allCharges = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem("allCharges", JSON.stringify(allCharges));

        navigate("/process/payment");
    };
    return (
        <Fragment>
            <MetaData title={`Confirm Order | UNIVERSE`} />
            <CustomizedSteppers activeStep={1} />
            <div className="confrimOrderContainer">
                <div className="user-shippingDetails">
                    <Typography>User Information</Typography>
                    <div className="userDetails">
                        <div>
                            <p>Name</p>
                            <span>{user.name}</span>
                        </div>
                        <div>
                            <p>Phone</p>
                            <span>{shippingInfo.phoneNo}</span>
                        </div>
                        <div>
                            <p>Address</p>
                            <span>{address}</span>
                        </div>

                    </div>
                    <Typography>Items In Cart</Typography>
                    <div className="itemsPurchased">
                        {cartItems && cartItems.map((item) => {
                            return (
                                <div className='itemsContainer' key={item.productId}>
                                    <img src={item.image} alt="Product" />
                                    <Link to={`/product/${item.productId}`}>{item.name}</Link>{" "}
                                    <span>
                                        {item.quantity} X ₹{item.price} = {" "}
                                        <b>₹{item.price * item.quantity}</b>
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="orederSummary">
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>Subtotal:</p>
                            <span>₹{subtotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>₹{shippingCharges}</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>₹{tax}</span>
                        </div>
                    </div>

                    <div className="orderSummaryTotal">
                        <div>
                            <p><b>Total:</b></p>
                            <span>₹{totalPrice}</span>
                        </div>
                    </div>
                    <button onClick={proceedToPayment} className="confirmOrderBtn">Proceed To Payment</button>
                </div>


            </div>
        </Fragment >
    )
}

export default ConfirmOrder