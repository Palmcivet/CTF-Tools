var log = function() {
    console.log.apply(console, arguments)
}

var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

var lowercase = function(str) {
    var result = ''
    for (var i = 0; i < str.length; i++) {
        var index = upper.indexOf(str[i])
        if (index >= 0) {
            result += lower[index]
        }else {
            result += str[i]
        }
    }
    return result
}
var encode = function(str, shift) {
    var result = ''
    var code = lowercase(str)
    for (var i = 0; i < code.length; i++) {
        var index = lower.indexOf(code[i])
        if (index >= 0) {
            new_index = (index + shift) % 26
            result += lower[new_index]
        }else {
            result += code[i]
        }
    }
    return result
}
var decode = function(str, shift) {
    var result = ''
    var code = lowercase(str)
    for (var i = 0; i < code.length; i++) {
        var index = lower.indexOf(code[i])
        if (index >= 0) {
            new_index = (index + 26 - shift) % 26
            result += lower[new_index]
        }else {
            result += code[i]
        }
    }
    return result
}

var clicked = function() {
    var code = document.getElementById("id-text-code").value
    var shift = document.getElementById("id-input-shift").value
    var newEncode = encode(code, parseInt(shift))
    document.getElementById("id-text-encode").value = newEncode
}
var encodeButton = document.querySelector("#id-button-encode")
encodeButton.addEventListener("click", clicked)

var clicked1 = function() {
    var code = document.getElementById("id-text-code1").value
    var result = ''
    for (var i = 0; i < 26; i++) {
        var newDecode = decode(code, i)
        //``模板字符串用法
        // result += `第${i+1}次解密:${newDecode}\n`
        result += "第" + (i+1) + "次解密:" + newDecode + "\n"
    }
    document.getElementById("id-text-decode").value = result
}
var encodeButton1 = document.querySelector("#id-button-decode")
encodeButton1.addEventListener("click", clicked1)

var contains = function(arr, val) {
  if (arr.indexOf(val) !== -1) {
    return true;
  } else {
    return false;
  }
}
var rank = function(wordList){
    var score = 0
    for (var i = 0; i < wordList.length; i++) {
        var word = wordList[i]
        // safari不支持words.includes(word)
        if (contains(words, word)) {
            score++
        }
    }
    var r = score / wordList.length * 100
    return r
}
var clicked2 = function() {
    var code = document.getElementById("id-text-code1").value
    var result = ''
    for (var i = 0; i < 26; i++) {
        var newDecode = decode(code, i)
        var wordList = newDecode.split(' ')
        var r = rank(wordList)
        if (r > 60) {
            r = Math.floor(r)
            //``模板字符串用法
            // result += `字典识别比率为${r}%:${newDecode}\n`
            result += "字典识别比率为" + r + "%:" + newDecode + "\n"
        }
    }
    document.getElementById("id-text-decode").value = result
}
var encodeButton2 = document.querySelector("#id-button-maxdecode")
encodeButton2.addEventListener("click", clicked2)
