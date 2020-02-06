const num = "0123456789";
const word = "口由中人工大王夫井羊";

const encode = (str) => {
	let result = "";
	for (let i = 0; i < str.length; i++) {
		let index = num.indexOf(str[i]);
		let index1 = word.indexOf(str[i]);
		if (index >= 0) {
			result += word[index];
		} else {
			if (index1 >= 0) {
				result += num[index1];
			} else {
				result += str[i];
			}
		}
	}
	return result;
};

const pawnShop = (raw) => {
	return encode(raw);
};

export { pawnShop };
