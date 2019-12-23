#! python3
# -*- coding: utf-8 -*-

import string
class ROT():
    def __init__(self, strs):
        self.strs = strs

    #两次encode即还原 rot13只加密字母
    def rot13_encode(self):
        start_a = ord('a')
        start_A = ord('A')
        encode_str = ""
        for key in self.strs:
            if not key.isalpha():
                encode_str += key
                continue
            if key.islower():
                start = start_a
            if key.isupper():
                start = start_A
            #alpha表，除26求余
            encode_letter = (ord(key) - start + 13) % 26 + start
            encode_str += chr(encode_letter)
        print("rot13:" + encode_str)
        return encode_str

    #rot5只加密数字
    def rot5_encode(self):
        encode_str = ""
        for key in self.strs:
            if not key.isdigit():
                encode_str += key
            else:
                digit = (int(key) + 5) % 10
                encode_digit = '%d' %digit
                encode_str += encode_digit
        print("rot5:" + encode_str)
        return encode_str

    #rot18 = rot13 + rot5
    def rot18_encode(self):
        self.strs = self.rot5_encode()
        encode_str = self.rot13_encode()
        print("rot18:" + encode_str)
        return encode_str

    #rot47 对数字、字母、常用符号进行编码，按照它们的ASCII值进行位置替换，用当前字符ASCII值往前数的第47位对应字符替换当前字符
    def rot47_encode(self):
        encode_str = ""
        for key in self.strs:
            tmp = ord(key) + 47
            if tmp > 126:
                tmp = tmp - 126 + 32
            encode_str += chr(tmp)
        print("rot47:" + encode_str)
        return encode_str

if __name__ == '__main__':
    str = input("please input string to decode:\n")
    rot = ROT(str)
    rot.rot13_encode()