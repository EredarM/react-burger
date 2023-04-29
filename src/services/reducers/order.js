import {
    ADD_ORDER,
    ADD_ORDER_SUCCESS,
    ADD_ORDER_ERROR,
    REMOVE_ORDER_MODAL
} from "../actions/order";

const initialState = {
    orderRequest: false,
    orderRequestSuccess: false,
    orderFailed: false,
    orderData: null,
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            return {
                ...state,
                orderRequest: false,
                orderFailed: false
            };
        case ADD_ORDER_SUCCESS:
            return {
                ...state,
                orderData: action.data,
                orderRequest: false,
                orderRequestSuccess: true
            };
        case ADD_ORDER_ERROR:
            return {
                ...state,
                orderRequest: false,
                orderFailed: true
            };
        case REMOVE_ORDER_MODAL:
            return initialState;
        default: {
            return state;
        }
    }
};