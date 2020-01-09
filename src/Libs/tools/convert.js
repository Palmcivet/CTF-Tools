/**
 * 十进制 => 二进制
 * @param {float} decNum - 输入值
 * @returns {String} 输出值
 */
const Dec2Bin = (decNum) = (
    decNum.toString(2)
)

/**
 * 十进制 => N 进制
 * @param {Number} decNum - 输入值
 * @param {Number} base - 进制
 * @returns {String} 输出值
 */
const Dec2Any = (decNum, base) = (
    decNum.toString(base)
)

/**
 * 二进制（含小数）=> 十进制
 * @param {Number} binNum - 二进制数
 */
function Bin2Dec(binNum) {
    if (Number.isInteger(binNum)) {
        return parseInt(binNum, 2)
    } else {
        const binNumArr = binNum.toString().split(".")
        // Int Part
        const binIntArr = binNumArr[0]
        const decInt = parseInt(binIntArr, 2)
        // Float Part
        const binFloatArr = binNumArr[1].split("")

        /**
         * 将 binFloatArr 数组中的每项转换为对应的小数部分的十进制数
         * @param {Array} binFloatArr - 二进制小数部分中由小数各位组成的数组
         */
        const binF2D = (binFloatArr) => {
            return binFloatArr.map(
                (currentValue, index) => {
                    return Number(currentValue) * Math.pow(2, (-(index + 1)))
                }
            )
        }
        const binFloatPart = binF2D(binFloatArr)
        const decFloat = binFloatPart.reduce(
            (accumulator, currentValue) => {
                return accumulator + currentValue
            })
        return decInt + decFloat
    }
}

/**
* 字符 => ASCII 码的十进制
* @param {String} str - 输入值
* @returns {Number} 输出值
*/
const Str2Ascii = (str) = (
    str.charCodeAt()
)

/**
 * ASCII => 字符串
 * @param {Number} ascii - ASCII 十进制值
 * @returns {String} 输出值
 */
const Dec2Any = (ascii) = (
    String.fromCharCode(ascii)
)

/**
 * 字符 => Unicode
 * @param {String} str - 输入值
 * @returns {Number} 输出值
 */
const Str2Unicode = (str) = (
    str.toString(2)
)