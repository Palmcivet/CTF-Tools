[toc]

## 参考应用
- [FeHelper](https://www.baidufe.com/fehelper)
- [OSChina 在线工具](http://tool.oschina.net/)
- [Encode](https://www.urlencoder.org)

## 架构
左中右布局

```
Logo | A | B | C | About |
====+===========+========+
    |           |        |
    |           |        |
    |           |        |
    |           |        |
    |           |        |
    |-----------+--------+
    |      @2020 AntD
```

输入输出统一为字符

### 页眉

### 页脚

### 工作区
- 复制：按钮
- 去除间隔字符：文本框输入
- 大小写转换：单选框（U、L、none）

常见情景：
1. 数值间的转换
    - 十进制 <=> 二/八/十六 进制
    - 59 => 0011 0010
    - 59 => 0x32
    - 59 => 62
2. 数值和字符间的转换。设前缀按钮：`\0x` `&#` `&#x`
    - 十进制 <=> 字符
    - 1100011 1110100 1100110 1011111 1100011 1101111 1100100 1100101 <= ctf_code
    - 99 116 102 95 99 111 100 101 <= ctf_code
3. base64 => 字符
    - Y3RmX2NvZGU= <=> ctf_code

常用编解码：
1. 二/八/十六/n 进制
2. Hexadecimal

### 左边栏
编码：
1. Base64/32/16
2. Unicode
3. URLencode
4. MD5 加密
5. 图片 Base
6. Morse 编码
7. 数字转 IP 地址 IP 地址转数字
8. UUencode
9.  XXencode
10. Shellcode
11. BubbleBubble
12. Quoted-Printable
13. HTML entity encoding
14. 与佛论禅
15. 繁简体转换

---------------------------
加密：
1.  Morse
2.  Virginia
3.  凯撒
4.  gzip
5.  ROT13/15/17

### 右边栏

下方放置其他在线工具：
- [smallpdf](https://smallpdf.com/cn)
- [QRazyBox](https://merricx.github.io/qrazybox/)
- [pcapfix](http://f00l.de/hacking/pcapfix.php)
