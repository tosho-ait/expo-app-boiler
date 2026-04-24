import {SET_PURCHASE_INTENT} from "./action";

const initialState = {
    intent: null,
};

const purchase = (state = initialState, action) => {
    switch (action.type) {
        case SET_PURCHASE_INTENT:
            return {
                ...state,
                intent: action.payload,
            };
        default:
            return state;
    }
};

export default purchase;
