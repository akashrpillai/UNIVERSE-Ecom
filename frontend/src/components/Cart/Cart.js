import React, { Fragment } from 'react'
import CartItemCard from "./CartItemCard.js"
import './cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsTocart, removeItemsFromCart } from '../../actions/cartAction.js'
import { useAlert } from 'react-alert'
import { Typography } from '@mui/material'
import { Link, useNavigate } from "react-router-dom"
import EmptyCart from '../../images/empty-cart.png'
import MetaData from '../layouts/MetaData.js'

const Cart = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    // Incerase Quantity of items in cart
    const increaseQuantity = (id, quantity, stock) => {
        const newQuantity = quantity + 1;
        if (stock <= quantity) {
            alert.show("NO items left in Stock")
            return
        }
        dispatch(addItemsTocart(id, newQuantity));
    }

    // decrease Quantity of items in cart
    const decreaseQuantity = (id, quantity) => {
        const newQuantity = quantity - 1;
        if (quantity <= 1) {
            // dispatch(removeItemsFromCart(id))
            // alert.success("Item Removed From Cart");
            return
        }
        dispatch(addItemsTocart(id, newQuantity));
    }
    // Remove Items from Cart
    const removeItem = (id) => {
        dispatch(removeItemsFromCart(id))
        alert.success("Item Removed From Cart");
    }

    // Check out 
    const checkOut = () => {
        navigate("/user/login?redirect=shipping");
    }
    return (
        <Fragment>
            <MetaData title={`shopping Cart | UNIVERSE`} />
            {cartItems.length === 0 ? (
                <Fragment>
                    <div className="emptyCartContainer">
                        <div className="emptyImage">
                            <img src={EmptyCart} alt="Empty-Cart-Icon" />
                        </div>
                        {user ? (<Fragment>
                            <div className="content">
                                <Typography>Looks Like Your Cart Is Empty</Typography>
                                <Link to="/products">View Latest Products</Link>
                            </div>
                        </Fragment>) : (<Fragment>
                            <div className="notlogedin">
                                <Typography>Missing Cart items?</Typography>
                                <p>Login to see the items you added previously</p>
                                <Link to="/user/login"><button>Login</button></Link>
                            </div>
                        </Fragment>)}
                    </div>
                </Fragment>
            ) : (<Fragment>
                <div className="cart_container">
                    <div className="cartheader">
                        <h3>Product</h3>
                        <h3>Quantity</h3>
                        <h3>Total</h3>
                    </div>
                    {cartItems && cartItems.map((item) => {
                        return (
                            <div className="card_container" key={item.productId}>
                                <CartItemCard item={item} removeItem={removeItem} />
                                <div className="increment-decrement-btn">
                                    <button onClick={() => { decreaseQuantity(item.productId, item.quantity) }}> &minus; </button>
                                    <input type="number" readOnly value={item.quantity} />
                                    <button onClick={() => { increaseQuantity(item.productId, item.quantity, item.stock) }}> &#43; </button>
                                </div>
                                <p className='subTotal'>{`₹${item.quantity * item.price}`}</p>
                            </div>
                        );
                    })}
                    <div className='cartGrossTotal'>
                        <div className="taxbox"></div>
                        <div className="cartGrossTotalBox">
                            <p>Grand Total</p>
                            <p>{`₹${cartItems.reduce((accumulator, currentValue) => {
                                return accumulator + currentValue.quantity * currentValue.price
                            }, 0)}`}</p>
                        </div>
                        <div></div>
                        <div className="checkOutbtn">
                            <button onClick={checkOut}>Check Out</button>
                        </div>
                    </div>

                </div>
            </Fragment>)}
        </Fragment>
    )
}

export default Cart