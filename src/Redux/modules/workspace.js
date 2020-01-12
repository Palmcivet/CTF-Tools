import { SideTree, retrieve } from '../../Components/SideTree';

const initState = {
    rawText: "",
    resText: "",
    encoding: "",
    mode: true, // true - decode | false - encode
    title: "",
};

// action types
const types = {
    CHANGE_ENCODING: "WORK/CHANGE_ENCODING",
    CHANGE_TEXT: "WORK/CHANGE_TEXT",
    DECODE: "WORK/DECODE",
    ENCODE: "WORK/ENCODE",
};

// action creators
const creators = {
    changeEncoding: (argEncoding) => ({
        type: types.CHANGE_ENCODING,
        encoding: argEncoding,
    }),
    changeText: (argText) => ({
        type: types.CHANGE_TEXT,
        rawText: argText,
    }),
    decode: () => ({
        type: types.DECODE,
    }),
    encode: () => ({
        type: types.ENCODE,
    })
};

/**
 * reducers
 * @param {Object} state
 * @param {string} state.rawText
 * @param {string} state.encoding
 * @param {boolean} state.mode
 * @param {string} state.title
 * @param {Object} action
 */
const reducers = (state = initState, action) => {
    switch (action.type) {
        case types.CHANGE_ENCODING:
            return {
                encoding: action.encoding,
                ...state
            }
        case types.CHANGE_TEXT:
            return {
                rawText: action.rawText,
                ...state
            }
        case types.DECODE:
            return {
                resText: retrieve(state.encoding)(state.rawText, "decode"),
                ...state
            }
        case types.ENCODE:
            return {
                resText: retrieve(state.encoding)(state.rawText, "encode"),
                ...state
            }
        default:
            return state;
    }
};

const selectors = {

};

export { reducers, types, creators, selectors };