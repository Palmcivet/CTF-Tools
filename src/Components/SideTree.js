import { urlencode } from '../Libs/urlencode';
import { quotedPrintable } from '../Libs/quotedPrintable';
import { base64 } from '../Libs/essential/base64';

const BASE = [
    "Base",
    "Base 家族编码",
    {
        base36: {
            TAG: "Base 36",
            LIB: "",
            COMMENT: "",
        },
        base64: {
            TAG: "Base 64",
            LIB: base64,
            COMMENT: "",
        },
        base58: {
            TAG: "Base 58",
            LIB: "",
            COMMENT: "",
        },
        base62: {
            TAG: "Base 62",
            LIB: "",
            COMMENT: "",
        },
        base85: {
            TAG: "Base 85",
            LIB: "",
            COMMENT: "",
        },
        base91: {
            TAG: "Base 91",
            LIB: "",
            COMMENT: "",
        },
        base92: {
            TAG: "Base 92",
            LIB: "",
            COMMENT: "",
        },
    }
];

const TYPICAL = [
    "typical",
    "常见编码",
    {
        unicode: {
            TAG: "Unicode",
            LIB: unicode,
            COMMENT: "",
        },
        urlencode: {
            TAG: "URLencode",
            LIB: urlencode,
            COMMENT: ""
        },
        quotedprintable: {
            TAG: "Quoted-Printable",
            LIB: quotedPrintable,
            COMMENT: ""
        },
    }
];

const ROT = [
    "ROT",
    "",
    {
        quotedprintable: {
            TAG: "Quoted-Printable",
            LIB: quotedPrintable,
            COMMENT: ""
        },
    }
];

const SideTree = [TYPICAL, BASE, ROT,];

/**
 * 传入函数名，返回函数
 * @param {String} argLibName - 待检索的函数名
 * @returns 返回函数
 */
const retrieve = (argLibName) => {
    for (let value of SideTree) {
        let val = value[2];
        if (val.hasOwnProperty(argLibName)) {
            return val[argLibName].LIB;;
        }
    }
};

export { SideTree, retrieve };