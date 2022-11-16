import { ADD_TO_CART, REMOVE_CART_ITEM, STORE_SHIPING_INFO } from "../constants/cartConst"

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find(
                (i) => {
                    return i.productId === item.productId
                }
            );
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) => {
                        return i.productId === isItemExist.productId ? item : i
                    }
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => {
                    return i.productId !== action.payload
                }),
            };

        case STORE_SHIPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };

        default:
            return state;
    }
};