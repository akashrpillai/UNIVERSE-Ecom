import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    CLEAR_ERROR,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
} from "../constants/productConst";
import axios from "axios";


//special action creator for api request {Thunk}
export const getProduct = (keyword = "", currentPage = 1, price = [0, 500000], category, ratings = 0) => {
    console.log("action", keyword, currentPage, price, category, ratings)
    return async (dispatch) => {
        try {
            dispatch({ type: ALL_PRODUCT_REQUEST })
            let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
            // console.log(link)
            if (category) {
                link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
            }
            const { data } = await axios.get(link)

            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: error.response.data.message
            })
        }
    }
};

// Get All Products Admin 
export const getAllProductsAdmin = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: ADMIN_PRODUCT_REQUEST })
            const { data } = await axios.get(`/api/v1/admin/products`)
            dispatch({
                type: ADMIN_PRODUCT_SUCCESS,
                payload: data.products
            })
        } catch (error) {
            dispatch({
                type: ADMIN_PRODUCT_FAIL,
                payload: error.response.data.message,
            });
        }
    }
}
// GET SINGLE PRODUCT DETAILS
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};
// create New Product
export const createNewProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};


// update Product
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
    console.log(id)
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// add New Review
export const addNewReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(`/api/v1/review`, reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Products reviews
export const getAllReviews = (productId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: ALL_REVIEW_REQUEST })
            const { data } = await axios.get(`/api/v1/reviews?productId=${productId}`)
            dispatch({
                type: ALL_REVIEW_SUCCESS,
                payload: data.reviews
            })
        } catch (error) {
            dispatch({
                type: ALL_REVIEW_FAIL,
                payload: error.response.data.message,
            });
        }
    }
}

// Delete Products reviews
export const deleteReviews = (productId, id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: DELETE_REVIEW_REQUEST })
            const { data } = await axios.delete(`/api/v1/reviews?productId=${productId}&id=${id}`)
            dispatch({
                type: DELETE_REVIEW_SUCCESS,
                payload: data.success
            })
        } catch (error) {
            dispatch({
                type: DELETE_REVIEW_FAIL,
                payload: error.response.data.message,
            });
        }
    }
}

// Clear the Errors
export const clearError = () => {
    return function (dispatch) {
        dispatch({ type: CLEAR_ERROR })
    }
}