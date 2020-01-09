/**
 * 封装 `window.atob` 和 `window.btoa`
 * @param {String} raw - 原始字符串
 * @param {String} mode - 模式：`decode`/`encode`
 * @returns {String} 返回字符串
 */
const base64 = (raw, mode) => {
    if (mode == 'decode') {
        return window.btoa(raw);
    }
    else if (mode == 'encode') {
        return window.atob(raw);
    }
    else {
        return raw;
    }
};

export { base64 };