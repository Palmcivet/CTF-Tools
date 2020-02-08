import { caesar } from "../Libs/caesar";
import { virginia } from "../Libs/virginia";
import { railFence } from "../Libs/railFence";
import { base64 } from "../Libs/base/base64";
import { urlencode } from "../Libs/typical/urlencode";
import { quotedPrintable } from "../Libs/typical/quotedPrintable";

const TYPICAL = {
	unicode: {
		TAG: "Unicode",
		LIB: "",
		ARG: {
			TEXT: false,
			NUM: false,
			BTN: ["&#", "&#x", "\\U", "\\U+"],
		},
		ANNOTATION: "",
	},
	urlencode: {
		TAG: "URLencode",
		LIB: urlencode,
		ARG: {
			TEXT: false,
			NUM: false,
			BTN: [],
		},
		ANNOTATION: "",
	},
	quotedprintable: {
		TAG: "Quoted-Printable",
		LIB: quotedPrintable,
		ANNOTATION: "",
	},
};

const BASE = {
	base36: {
		TAG: "Base 36",
		LIB: "",
		ANNOTATION: "",
	},
	base64: {
		TAG: "Base 64",
		LIB: base64,
		ANNOTATION: "",
	},
	base58: {
		TAG: "Base 58",
		LIB: "",
		ANNOTATION: "",
	},
	base62: {
		TAG: "Base 62",
		LIB: "",
		ANNOTATION: "",
	},
	base85: {
		TAG: "Base 85",
		LIB: "",
		ANNOTATION: "",
	},
	base91: {
		TAG: "Base 91",
		LIB: "",
		ANNOTATION: "",
	},
	base92: {
		TAG: "Base 92",
		LIB: "",
		ANNOTATION: "",
	},
};

const ROT = {
	rot5: {
		TAG: "ROT 5",
		LIB: "",
		ANNOTATION: "",
	},
	rot13: {
		TAG: "ROT 13",
		LIB: "",
		ANNOTATION: "",
	},
	rot18: {
		TAG: "ROT 18",
		LIB: "",
		ANNOTATION: "",
	},
	rot47: {
		TAG: "ROT 47",
		LIB: "",
		ANNOTATION: "",
	},
};

const Other = {
	brainfuck: {
		TAG: "Brainfuck",
		LIB: "",
		ANNOTATION: "",
	},
	jsfuck: {
		TAG: "JSFuck",
		LIB: "",
		ANNOTATION: "",
	},
	uuencode: {
		TAG: "UUencode",
		LIB: "",
		ANNOTATION: "",
	},
	caesar: {
		TAG: "Caesar Cipher",
		LIB: caesar,
		ARG: {
			TEXT: false,
			NUM: true,
			BTN: [],
		},
		ANNOTATION: "",
	},
	virginia: {
		TAG: "Virginia Cipher",
		LIB: virginia,
		ARG: {
			TEXT: true,
			NUM: false,
			BTN: [],
		},
		ANNOTATION: "",
	},
	railFence: {
		TAG: "Rail-Fence Cipher",
		LIB: railFence,
		ARG: {
			TEXT: true,
			NUM: false,
			BTN: [],
		},
		ANNOTATION: "",
	},
};

const SideTree = {
	常见编码: TYPICAL,
	"Base 家族": BASE,
	Rotate: ROT,
	其他: Other,
};

/**
 * 检索函数
 */

/**
 *
 * @param {String} argLibName - 函数名的内部标识
 * @param {String} argRaw - 原始字符串
 * @param {String} argMode - 模式
 * @param {Object} argRest - 剩余参数
 * @returns 返回一个对象 {status: true, result: ""}
 */
const excute = (argLibName, argRaw, argMode, argRest) => {
	for (let set in SideTree) {
		let item = SideTree[set];
		if (item.hasOwnProperty(argLibName)) {
			return item[argLibName]["LIB"](argRaw, argMode, argRest);
		}
	}
	return "NULL";
};

export { SideTree, excute };
