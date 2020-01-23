import { urlencode } from '../Libs/urlencode';
import { quotedPrintable } from '../Libs/quotedPrintable';
import { base64 } from '../Libs/essential/base64';

const TYPICAL = [
    "typical",
    "常见编码",
    {
        unicode: {
            TAG: "Unicode",
            LIB: "",
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

const ROT = [
    "ROT",
    "Rotate",
    {
        rot5: {
            TAG: "ROT 5",
            LIB: "",
            COMMENT: ""
        },
        rot13: {
            TAG: "ROT 13",
            LIB: "",
            COMMENT: ""
        },
        rot18: {
            TAG: "ROT 18",
            LIB: "",
            COMMENT: ""
        },
        rot47: {
            TAG: "ROT 47",
            LIB: "",
            COMMENT: ""
        },
    }
];

const SideTree = [TYPICAL, BASE, ROT];

/**
 * 检索函数
 * @param {String} argLibName - 待检索的 TAG（函数名的内部标识）
 * @returns 返回函数 LIB
 */
const retrieve = (argLibName) => {
    for (let value of SideTree) {
        let val = value[2];
        if (val.hasOwnProperty(argLibName)) {
            return val[argLibName].LIB;
        }
        else {
            return "NULL";
        }
    }
};

export { SideTree, retrieve };