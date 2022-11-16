import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import SideBar from "./Sidebar";
import { getOrderDetails, clearErrors, updateOrder } from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import CategoryIcon from '@mui/icons-material/Category';
import { Button } from "@mui/material";
import { UPDATE_ORDER_RESET } from "../../constants/orderConst";
import "./updateOrder.css"
const UpdateOrder = () => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);
    console.log(order)
    const { orderId } = useParams();
    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(orderId, myForm));
    };

    const dispatch = useDispatch();
    const alert = useAlert();

    const [status, setStatus] = useState("");

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success(`Order Status Updated To ${status}`);
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(orderId));
    }, [dispatch, alert, error, orderId, isUpdated, updateError, status]);

    return (
        <Fragment>
            <MetaData title="Process Order | UNIVERSE" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {loading ? (<Loader />) : (
                        <div className="confrimOrderContainer">
                            <div className="user-shippingDetails">
                                <Typography>User Information</Typography>
                                <div className="orderDetails">
                                    <div>
                                        <p>Name</p>
                                        <span>{order && order.user && order.user.name}</span>
                                    </div>
                                    <div>
                                        <p>Email</p>
                                        <span>{order && order.user && order.user.email}</span>
                                    </div>
                                    <div>
                                        <p>Phone</p>
                                        <span>{order && order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                    </div>
                                    <div>
                                        <p>Address</p>
                                        <span>{order && order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</span>
                                    </div>

                                </div>
                                <Typography>Order Status</Typography>
                                <div className="orderDetails">
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
                                <Typography>Payment Information</Typography>
                                <div className="orderDetails">
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
                                    <div>
                                        <p><b>Total:</b></p>
                                        <span>₹{order && order.totalPrice}</span>
                                    </div>
                                    <div>
                                        <p><b>Payment Status:</b></p>
                                        <span className={order && order.paymentInfo && order.paymentInfo.status === "succeeded"
                                            ? "greenColor"
                                            : "redColor"
                                        }>
                                            {order && order.paymentInfo &&
                                                order.paymentInfo.status === "succeeded"
                                                ? "PAID"
                                                : "NOT PAID"}
                                        </span>
                                    </div>
                                </div>
                                <Typography>Products Ordered</Typography>
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
                            <div
                                style={{
                                    display: order && order.orderStatus === "Delivered" ? "none" : "block",
                                }}
                            >
                                <form
                                    className="updateOrderForm"
                                    onSubmit={updateOrderSubmitHandler}
                                >
                                    <h1>Process Order</h1>

                                    <div>
                                        <CategoryIcon />
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Action</option>
                                            {order && order.orderStatus === "Processing" && (
                                                <option value="Shipped">Shipped</option>
                                            )}

                                            {order && order.orderStatus === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )}
                                        </select>
                                    </div>

                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={
                                            loading ? true : false || status === "" ? true : false
                                        }
                                    >
                                        Process
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

export default UpdateOrder;
