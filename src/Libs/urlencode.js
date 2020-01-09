/**
 * 封装 `window.decodeURI` 和 `window.encodeURL`
 * @param {String} raw - 原始字符串
 * @param {String} mode - 模式：`decode`/`encode`
 * @returns {String} 返回字符串
 */
const urlencode = (raw, mode) => {
	if (mode == 'decode') {
		return window.decodeURI(raw);
	}
	else if (mode == 'encode') {
		return window.encodeURI(raw);
	}
	else {
		return raw;
	}
};

export { urlencode };