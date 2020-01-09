/**
 * 将字符转换为二进制。
 * example: `hi` => `1101000 1101001`
 * @param {String} str - 原始字符串
 */
const strToBinary = (str) => {
    let result = [];
    let list = str.split("");
    for (let i = 0; i < list.length; i++) {
        if (i != 0) {
            result.push(" ");
        }
        let item = list[i];
        let binStr = item.charCodeAt().toString(2);
        result.push(binStr);
    }
    return result.join("");
}

export { strToBinary };