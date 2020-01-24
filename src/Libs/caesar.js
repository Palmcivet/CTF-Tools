const lower = "abcdefghijklmnopqrstuvwxyz";
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let lowercase = (str) => {
	let result = "";
	for (let i = 0; i < str.length; i++) {
		let index = upper.indexOf(str[i]);
		if (index >= 0) {
			result += lower[index];
		} else {
			result += str[i];
		}
	}
	return result;
};

let encode = (raw, shift) => {
	let result = "";
	let code = lowercase(raw);
	for (let i = 0; i < code.length; i++) {
		let index = lower.indexOf(code[i]);
		if (index >= 0) {
			new_index = (index + shift) % 26;
			result += lower[new_index];
		} else {
			result += code[i];
		}
	}

	return result;
};

let decode = (raw, shift) => {
	let result = "";
	let code = lowercase(raw);
	for (let i = 0; i < code.length; i++) {
		let index = lower.indexOf(code[i]);
		if (index >= 0) {
			new_index = (index + 26 - shift) % 26;
			result += lower[new_index];
		} else {
			result += code[i];
		}
	}
	return result;
};

/**
 * 全局设定密钥为字符串形式，此处需要自行转换
 * @param {String} raw - 原始字符串
 * @param {String} mode - 模式：`decode`/`encode`
 * @param {Object} rest - 多余参数，使用对象来存储，便于指定键值
 * @param {String} key - 密钥
 * @returns {String} 返回字符串
 */
const caesar = (raw, mode, rest) => {
	rest.key = parseInt(rest.key);
	if (mode == "decode") {
		return decode(raw, rest.key);
	} else if (mode == "encode") {
		return encode(raw, rest.key);
	} else if (mode == "brute") {
		let result = "";
		for (let i = 0; i < 26; i++) {
			let newDecode = decode(code, i);
			result += `第${i + 1}次解密: ${newDecode}\n`;
		}
		return result;
	} else {
		return raw;
	}
};

export { caesar };
