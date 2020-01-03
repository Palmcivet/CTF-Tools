function strToBinary(str) {
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