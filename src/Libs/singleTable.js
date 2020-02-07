const word = "abcdefghijklmnopqrstuvwxyz";

const unique = function(str) {
	let newArr = [];
	let result = "";
	str = str.replace(/\s+/g, "");
	for (let i = 0; i < str.length; i++) {
		let a = str[i];
		if (newArr.indexOf(a) !== -1) {
			continue;
		} else {
			newArr[newArr.length] = a;
		}
	}
	result = newArr.join("");
	return result;
};

const table = function(str) {
	let result = "";
	let list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	//去除密钥空格与重复字符
	str = unique(str);
	for (let i = 0; i < str.length; i++) {
		let index = list.indexOf(str[i]);
		if (index >= 0) {
			//置换表删除1个字母
			list = list.replace(str[i], "");
		} else {
			result += str[i];
		}
	}
	result = str + list;
	return result;
};

const encode = (str, key) => {
	let result = "";
	for (let i = 0; i < str.length; i++) {
		let index = word.indexOf(str[i]);
		if (index >= 0) {
			result += key[index];
		} else {
			result += str[i];
		}
	}
	return result;
};

const decode = (str, key) => {
	let result = "";
	for (let i = 0; i < str.length; i++) {
		let index = key.indexOf(str[i]);
		if (index >= 0) {
			result += word[index];
		} else {
			result += str[i];
		}
	}
	return result;
};

const singleTable = (raw, mode, rest) => {
	if (mode == "decode") {
		return decode(raw, table(rest.key));
	} else if (mode == "encode") {
		return encode(raw, table(rest.key));
	} else if (mode == "brute") {
		return decode(raw);
	} else {
		return raw;
	}
};

export { singleTable };
