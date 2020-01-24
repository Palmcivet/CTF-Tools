const lower = "abcdefghijklmnopqrstuvwxyz";
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const keystr = {
	a: "abcdefghijklmnopqrstuvwxyz",
	b: "bcdefghijklmnopqrstuvwxyza",
	c: "cdefghijklmnopqrstuvwxyzab",
	d: "defghijklmnopqrstuvwxyzabc",
	e: "efghijklmnopqrstuvwxyzabcd",
	f: "fghijklmnopqrstuvwxyzabcde",
	g: "ghijklmnopqrstuvwxyzabcdef",
	h: "hijklmnopqrstuvwxyzabcdefg",
	i: "ijklmnopqrstuvwxyzabcdefgh",
	j: "jklmnopqrstuvwxyzabcdefghi",
	k: "klmnopqrstuvwxyzabcdefghij",
	l: "lmnopqrstuvwxyzabcdefghijk",
	m: "mnopqrstuvwxyzabcdefghijkl",
	n: "nopqrstuvwxyzabcdefghijklm",
	o: "opqrstuvwxyzabcdefghijklmn",
	p: "pqrstuvwxyzabcdefghijklmno",
	q: "qrstuvwxyzabcdefghijklmnop",
	r: "rstuvwxyzabcdefghijklmnopq",
	s: "stuvwxyzabcdefghijklmnopqr",
	t: "tuvwxyzabcdefghijklmnopqrs",
	u: "uvwxyzabcdefghijklmnopqrst",
	v: "vwxyzabcdefghijklmnopqrstu",
	w: "wxyzabcdefghijklmnopqrstuv",
	x: "xyzabcdefghijklmnopqrstuvw",
	y: "yzabcdefghijklmnopqrstuvwx",
	z: "zabcdefghijklmnopqrstuvwxy",
};

const lowercase = (str) => {
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

let keylist = (keys, shift) => {
	let key = lowercase(keys);
	let index = shift % key.length;
	let word = key[index];
	return keystr[word];
};

let encode = (str, keys) => {
	let result = "";
	let code = lowercase(str);
	let j = 0;
	// 去除 key 中所有空格
	let key = keys.replace(/\s+/g, "");
	for (let i = 0; i < code.length; i++) {
		let index = lower.indexOf(code[i]);
		if (index >= 0) {
			var strlist = keylist(key, j);
			j++;
			result += strlist[index];
		} else {
			result += code[i];
		}
	}
	return result;
};

let decode = (str, keys) => {
	let result = "";
	let code = lowercase(str);
	let j = 0;
	// 去除 key 中所有空格
	let key = keys.replace(/\s+/g, "");
	for (let i = 0; i < code.length; i++) {
		let index = lower.indexOf(code[i]);
		if (index >= 0) {
			let strlist = keylist(key, j);
			let new_index = strlist.indexOf(code[i]);
			j++;
			result += lower[new_index];
		} else {
			result += code[i];
		}
	}
	return result;
};

/**
 * 维吉尼亚密码
 * @param {String} raw - 原始字符串
 * @param {String} mode - 模式：`decode`/`encode`
 * @param {Object} rest - 多余参数，使用对象来存储，便于指定键值
 * @param {String} key - 密钥
 * @returns {String} 返回字符串
 */
const virginia = (raw, mode, rest) => {
	if (mode == "decode") {
		return decode(raw, rest.key);
	} else if (mode == "encode") {
		return encode(raw, rest.key);
	} else if (mode == "brute") {
		return decode(raw);
	} else {
		return raw;
	}
};

export { virginia };
