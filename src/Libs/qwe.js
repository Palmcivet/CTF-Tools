let lower = "abcdefghijklmnopqrstuvwxyz";
let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let qwe = "qwertyuiopasdfghjklzxcvbnm";

let lowercase = function(str) {
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

let encode = (str) => {
	let result = "";
	let code = lowercase(str);
	for (let i = 0; i < code.length; i++) {
		let index = lower.indexOf(code[i]);
		if (index >= 0) {
			result += qwe[index];
		} else {
			result += code[i];
		}
	}
	return result;
};

const decode = (str) => {
	let result = "";
	let code = lowercase(str);
	for (let i = 0; i < code.length; i++) {
		let index = qwe.indexOf(code[i]);
		if (index >= 0) {
			result += lower[index];
		} else {
			result += code[i];
		}
	}
	return result;
};

const qwe = (raw, mode) => {
	if (mode == "decode") {
		return decode(raw);
	} else if (mode == "encode") {
		return encode(raw);
	} else {
		return raw;
	}
};

export { qwe };
