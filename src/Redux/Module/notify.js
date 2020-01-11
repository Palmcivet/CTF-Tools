const initState = {
    error: false,
    msg: "",
};

// action types
const types = {
    OP_SUCCESS: "NOTIFY/OP_SUCCESS",
    OP_FAILED: "NOTIFY/OP_FAILED",
    OP_CLIPED: "NOTIFY/OP_CLIPED",
    CLEAR_MSG: "NOTIFY/CLEAR_MSG",
};

// action creators
const creators = {
    opSuccess: (sucMsg) => ({
        type: types.OP_SUCCESS,
        msg: sucMsg,
    }),
    opFalied: (errMsg) => ({
        type: types.OP_FAILED,
        msg: errMsg,
    }),
    opCilped: () => ({
        type: types.OP_CLIPED
    }),
    clearMsg: () => ({
        type: types.CLEAR_MSG
    }),
};

/**
 * reducers
 * @param {Object} state
 * @param {String} state.error
 * @param {Object} action
 */
const reducers = (state = initState, action) => {
    switch (action.type) {
        case types.OP_SUCCESS:
            return { ...state }
        case types.OP_FAILED:
            return { ...state }
        case types.CLEAR_MSG:
            return { ...state, msg: "" }
        case types.OP_CLIPED:
            return { ...state }
        default:
            return state;
    }
};

const selectors = {

};

export default reducers;
export { actions, creators, selectors };