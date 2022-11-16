import { ADD_TO_CART, REMOVE_CART_ITEM,STORE_SHIPING_INFO } from "../constants/cartConst"
import axios from "axios"


// GET SINGLE PRODUCT DETAILS AND ADD ITEM TO CART
export const addItemsTocart = (id, quantity) => {
    return async (dispatch, getState) => {
        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: ADD_TO_CART,
            payload: {
                productId: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity,
            },
        });
        // console.log("getState From Action=>",getState().cart.cartItems)
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
    };
}

// Remove From Cart
export const removeItemsFromCart = (id) => {
    return async (dispatch, getState) => {
        dispatch({
            type: REMOVE_CART_ITEM,
            payload: id
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    };

};

//Store Shipping Info 
export const storeShippingInfo = (data) => {
    return async (dispatch) => {
        dispatch({
            type: STORE_SHIPING_INFO,
            payload: data
        });
        localStorage.setItem("shippingInfo", JSON.stringify(data));
    };

};