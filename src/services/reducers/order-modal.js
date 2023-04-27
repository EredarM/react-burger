import {
    ADD_ORDER_MODAL,
    REMOVE_ORDER_MODAL
} from "../actions/order-modal";

const initialState = {
    isOpen: false,
}

export const orderModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER_MODAL:
            return {
                isOpen: true
            };
        case REMOVE_ORDER_MODAL:
            return {
                isOpen: false
            };
        default: {
            return state;
        }

    }
};