let composite = [
	4,
	6,
	8,
	9,
	10,
	12,
	14,
	15,
	16,
	18,
	20,
	21,
	22,
	24,
	25,
	26,
	27,
	28,
	30,
	32,
	33,
	34,
	35,
	36,
	38,
	40,
	42,
	44,
	45,
	46,
	48,
	49,
	50,
	51,
	52,
	54,
	55,
	56,
	57,
	58,
	60,
	62,
	63,
	64,
	65,
	66,
	68,
	69,
	70,
	72,
	74,
	75,
	76,
	77,
	78,
	80,
	81,
	82,
	84,
	85,
	86,
	87,
	88,
	90,
	91,
	92,
	93,
	94,
	95,
	96,
	98,
	99,
	100,
];

let encode = (str, num) => {
	str = str.replace(/\s+/g, "");
	let len = str.length;
	let factor = [];
	let result = "";
	if (composite.indexOf(len) !== -1) {
		for (let i = 2; i < len; i++) {
			if (len % i == 0) {
				factor.push(i);
			}
		}
		if (factor.indexOf(num) !== -1) {
			for (let i = 0; i < num; i++) {
				var index = i;
				for (let j = 0; j < len / num; j++) {
					result += str[index];
					index = index + num;
				}
			}
		} else {
			result =
				"每栏字符数不是字符总数的因数，无法栅栏加密。" +
				"可以使用的因数为" +
				factor;
		}
	} else {
		result =
			"字符总数不是100之内的合数，无法栅栏加密。" + "字符总数为" + len;
	}
	return result;
};

let decode = (str) => {
	str = str.replace(/\s+/g, "");
	let len = str.length;
	let factor = [];
	let result = "";
	if (composite.indexOf(len) !== -1) {
		for (let i = 2; i < len; i++) {
			if (len % i == 0) {
				factor.push(i);
			}
		}
		for (let i = 0; i < factor.length; i++) {
			result += factor[i] + "字一栏：";
			for (let j = 0; j < factor[i]; j++) {
				var index = j;
				for (let k = 0; k < len / factor[i]; k++) {
					result += str[index];
					index = index + factor[i];
				}
			}
			result += "\n";
		}
	} else {
		result =
			"字符总数不是100之内的合数，无法栅栏解密。" + "字符总数为" + len;
	}
	return result;
};

/**
 * 栅栏密码
 * @param {String} raw - 原始字符串
 * @param {String} mode - 模式：`decode`/`encode`
 * @param {Object} rest - 多余参数，使用对象来存储，便于指定键值
 * @param {String} key - 密钥
 * @returns {String} 返回字符串
 */
const railFence = (raw, mode, rest) => {
	if (mode == "decode") {
		return decode(raw);
	} else if (mode == "encode") {
		return encode(raw, parseInt(rest.key));
	} else if (mode == "brute") {
		return decode(raw);
	} else {
		return raw;
	}
};

export { railFence };
