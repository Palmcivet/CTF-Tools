import { excute } from "../../Configurations/SideTree";

const initState = {
	rawText: "raw",
	resText: "res",
	encoding: "base64",
	key: "",
	mode: true, // true - decode | false - encode
	comment: {
		title: "",
	},
	widget: {},
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
	}),
};

/**
 * reducers
 * @param {Object} state
 * @param {String} state.rawText
 * @param {String} state.encoding
 * @param {Boolean} state.mode
 * @param {String} state.title
 * @param {Object} action
 */
const reducers = (state = initState, action) => {
	switch (action.type) {
		case types.CHANGE_ENCODING:
			return {
				...state,
				encoding: action.encoding,
			};
		case types.CHANGE_TEXT:
			return {
				...state,
				rawText: action.rawText,
			};
		case types.DECODE:
			console.log(state.encoding, state.rawText);
			return {
				...state,
				resText: excute(state.encoding, state.rawText, "decode"),
			};
		case types.ENCODE:
			console.log(te(state.encoding));
			console.log(excute(state.encoding));
			let res = excute(state.encoding)(state.rawText, "encode");
			return {
				...state,
				resText: res,
			};
		default:
			return state;
	}
};

const selectors = {
	getRawText: (state) => state.workspace.rawText,
	getResText: (state) => state.workspace.resText,
};

export { reducers, types, creators, selectors };
