import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from "./reducers/productReducer";
import { allUsersReducer, forgotPasswordReducer, profileUpdateReducer, userDetailsReducer, userReducer } from "./reducers/userReducer"
import { cartReducer } from "./reducers/cartReducer";
import { getAllOrderReducer, getMyOrdersReducer, getOrderDetailsReducer, OrderReducer, PlacenewOrderReducer } from "./reducers/orderReducer";
// import {persistStore,persistReducer} from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//     key:"persist-key",
//     storage
// }

const rootReducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileUpdateReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: PlacenewOrderReducer,
    myOrders: getMyOrdersReducer,
    orderDetails: getOrderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: getAllOrderReducer,
    order: OrderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
});
let intialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [], // initial State of cart reducer
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    }


};
const middleware = [thunk] // Making Array so that multiple middlewares can be passed
// console.log("initial State from Store", intialState)
//Persisted Root Reducer
// const persistedRootReducer = persistReducer(persistConfig,rootReducer)

const Store = createStore(rootReducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))
// const Persistor = persistStore(Store)
export default Store;
// export {Persistor}