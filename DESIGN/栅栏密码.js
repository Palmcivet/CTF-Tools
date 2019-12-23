var log = function() {
    console.log.apply(console, arguments)
}

var heshu = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25,
     26, 27, 28, 30, 32, 33, 34, 35, 36, 38, 40, 42, 44, 45, 46, 48, 49, 50,
     51, 52, 54, 55, 56, 57, 58, 60, 62, 63, 64, 65, 66, 68, 69, 70, 72, 74,
     75, 76, 77, 78, 80, 81, 82, 84, 85, 86, 87, 88, 90, 91, 92, 93, 94, 95, 96, 98, 99, 100]

var encode = function(str, num) {
    str = str.replace(/\s+/g, "")
    num = parseInt(num)
    var len = str.length
    var yinshu = []
    var result = ""
    if (heshu.indexOf(len) !== -1) {
        for (var i = 2; i < len; i++) {
            if (len % i == 0) {
                yinshu.push(i)
            }
        }
        if (yinshu.indexOf(num) !== -1) {
            for (var i = 0; i < num; i++) {
                var index = i
                for (var j = 0; j < (len/num); j++) {
                    result += str[index]
                    index = index + num
                }
            }
        }else {
            result = "每栏字符数不是字符总数的因数，无法栅栏加密。" + "可以使用的因数为" + yinshu
        }
    }else {
        result = "字符总数不是100之内的合数，无法栅栏加密。" + "字符总数为" + len
    }
    return result
}

var decode = function(str) {
    str = str.replace(/\s+/g, "")
    var len = str.length
    var yinshu = []
    var result = ""
    if (heshu.indexOf(len) !== -1) {
        for (var i = 2; i < len; i++) {
            if (len % i == 0) {
                yinshu.push(i)
            }
        }
        for (var i = 0; i < yinshu.length; i++) {
            result += yinshu[i] + "字一栏："
            for (var j = 0; j < yinshu[i]; j++) {
                var index = j
                for (var k = 0; k < (len/yinshu[i]); k++) {
                    result += str[index]
                    index = index + yinshu[i]
                }
            }
            result += '\n'
        }
    }else {
        result = "字符总数不是100之内的合数，无法栅栏解密。" + "字符总数为" + len
    }
    return result
}

var clicked = function() {
     var code = document.getElementById("id-text-encode").value
     var num = document.getElementById("id-text-num").value
     var newEncode = encode(code, num)
     document.getElementById("id-text-decode").value = newEncode
 }

var clicked1 = function() {
    var code = document.getElementById("id-text-encode").value
    var newDecode = decode(code)
    document.getElementById("id-text-decode").value = newDecode
 }

var __main = function() {
     var encodeButton = document.querySelector("#id-button-encode")
     encodeButton.addEventListener("click", clicked)
     var decodeButton = document.querySelector("#id-button-decode")
     decodeButton.addEventListener("click", clicked1)
}

__main()