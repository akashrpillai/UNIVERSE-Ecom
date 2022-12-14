import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ERRORS,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
} from "../constants/orderConst"
import axios from "axios";

// Create Order
export const createOrder = (order) => {
    
    return async (dispatch) => {
        try {
            dispatch({ type: CREATE_ORDER_REQUEST });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post("/api/v1/order/new", order, config);

            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: CREATE_ORDER_FAIL,
                payload: error.response.data.message,
            });
        }
    };
}

// Get orders 
export const getOrders = () => {

    return async (dispatch) => {
        try {
            dispatch({ type: MY_ORDERS_REQUEST });
            const { data } = await axios.get("/api/v1/orders/me");

            dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
        } catch (error) {
            dispatch({
                type: MY_ORDERS_FAIL,
                payload: error.response.data.message,
            });
        }
    };
}
// Get order Details

export const getOrderDetails = (id) => {

    return async (dispatch) => {
        try {
            dispatch({ type: ORDER_DETAILS_REQUEST });
            const { data } = await axios.get(`/api/v1/order/${id}`);
            dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order});
        } catch (error) {
            dispatch({
                type: ORDER_DETAILS_FAIL,
                payload: error.response.data.message,
            });
        }
    };
}

// Admin

// Get All orders 
export const getAllOrders = () => {

    return async (dispatch) => {
        try {
            dispatch({ type: ALL_ORDER_REQUEST });
            const { data } = await axios.get("/api/v1/admin/orders");

            dispatch({ type: ALL_ORDER_SUCCESS, payload: data.orders });
        } catch (error) {
            dispatch({
                type: ALL_ORDER_FAIL,
                payload: error.response.data.message,
            });
        }
    };
}
// Update order
export const updateOrder = (id,order) => {
    
    return async (dispatch) => {
        try {
            dispatch({ type: UPDATE_ORDER_REQUEST });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.put(`/api/v1/admin/order/${id}`, order, config);

            dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
        } catch (error) {
            dispatch({
                type: UPDATE_ORDER_FAIL,
                payload: error.response.data.message,
            });
        }
    };
}
// Delete order
export const deleteOrder = (id) => {
    
    return async (dispatch) => {
        try {
            dispatch({ type: DELETE_ORDER_REQUEST });

            const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

            dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
        } catch (error) {
            dispatch({
                type: DELETE_ORDER_FAIL,
                payload: error.response.data.message,
            });
        }
    };
}
// Clearing Errors
export const clearErrors = () => {
    return async (dispatch) => {
        dispatch({ type: CLEAR_ERRORS });
    };
}