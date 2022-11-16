import React, { Fragment, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import "./orderDetails.css"
import MetaData from '../layouts/MetaData'
import { useAlert } from 'react-alert'
import Loader from "../layouts/loader/Loader"
import { getOrderDetails, clearErrors } from "../../actions/orderAction"
import { useSelector, useDispatch } from 'react-redux'
import { Typography } from '@mui/material'

const OrderDetails = () => {
    const { orderId } = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { order, loading, error } = useSelector((state) => state.orderDetails);
    console.log(loading ? "Loading" : order ? order.orderItems : order)
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getOrderDetails(orderId));
    }, [dispatch, alert, error, orderId])


    return (
        <Fragment>
            {loading ? (<Loader />) : (<Fragment>
                <MetaData title={`OrderDetails | UNIVERSE`} />
                <div className="confrimOrderContainer">
                    <div className="user-shippingDetails">
                        <Typography>User Information</Typography>
                        <div className="orderDetails">
                            <div>
                                <p>Name</p>
                                <span>{order && order.user && order.user.name}</span>
                            </div>
                            <div>
                                <p>Phone</p>
                                <span>{order && order.shippingInfo && order.shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address</p>
                                <span>{order && order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</span>
                            </div>
                            <div>
                                <p>Order Id</p>
                                <span>{order && order._id}</span>
                            </div>
                            <div>
                                <p>Order Status</p>
                                <span className={
                                    order && order.orderStatus && order.orderStatus === "Delivered"
                                        ? "greenColor"
                                        : "redColor"
                                }>{order && order.orderStatus}</span>
                            </div>

                        </div>
                        <Typography>Products</Typography>
                        <div className="itemsPurchased">
                            {order && order.orderItems && order.orderItems.map((item) => {
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
                        <Typography>PayMent Information</Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>₹{order && order.itemPrice}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>₹{order && order.shippingPrice}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>₹{order && order.taxPrice}</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <div>
                                <p><b>Total:</b></p>
                                <span>₹{order && order.totalPrice}</span>
                            </div>
                        </div>
                        <div className="paymentInfo">
                            <div>
                                <p>Payment Status</p>
                                <span>{order && order.paymentInfo && order.paymentInfo.status}</span>
                            </div>
                            <div>
                                <p>Paid At</p>
                                <span>{order && order.paidAt.slice(0, 10)}</span>
                            </div>
                        </div>

                    </div>


                </div>
            </Fragment>)}
        </Fragment>
    )
}

export default OrderDetails