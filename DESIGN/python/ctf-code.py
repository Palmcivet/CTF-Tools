# !/usr/bin/python3
# coding: utf-8
# Github: https://github.com/Palmcivet/CTF-tools
# Author: Palm Civet

import sys
import getopt

import base64
import urllib
import quopri
import cgi

# import HTMLParser
# import bubblepy


def process(content):
    if ' ' in content:
        res = content.split(' ')
    elif ',' in content:
        res = content.split(',')
    elif ';' in content:
        res = content.split(';')
    elif '\\x' in content:
        res = content.split('\\x')
    else:
        res = list(content)
    return res


# content should be num
def transform(content, mode):
    res = ''
    for i in content:
        if mode in ('B', 'b', 'bin', '2'):
            res = res + bin(int(ord(i))).replace('0b', '') + ' '
        elif mode in ('O', 'o', 'oct', '8'):
            res = res + oct(int(ord(i))).replace('0o', '') + ' '
        elif mode in ('D', 'd', 'dec', '10'):
            res = res + str(ord(i)) + ' '
        elif mode in ('H', 'h', 'hex', '16'):
            res = res + hex(int(ord(i))).replace('0x', '') + ' '
        else:
            pass
    return res


# content should be dec
def n2s(content, mode):
    if content == '':
        return '[!] The content is NULL!'
    else:
        res = ''
        content = process(content)
        if mode == 'd':
            for i in content:
                if ord(i) > 31 and ord(i) < 127:
                    res = res + str(int(ord(i))) + ' '
        elif mode == 'e':
            for i in content:
                if int(i, base=10) > 31 and int(i, base=10) < 127:
                    res = res + chr(int(i, base=10))
        return res


def slice_code(content, width):
    res = []
    while len(content) > 0:
        res.append(content[0:width:])
        content = content[width::]
    return res


def xxencode(content, mode):
    xxcode = '+-' + figure + alphabet_C + alphabet_L
    if content == '':
        return '[!] The content is NULL!'
    else:
        res = ''
        if mode == 'd':
            xxcode = dict(zip(xxcode, (i for i in range(len(xxcode)))))
            list_cipher = ''
            for i in content:
                tmp = (str(xxcode.get(i)))  # 34 62
                list_cipher += '{:06b}'.format(int(tmp))

            list_plian = slice_code(list_cipher, 24)
            for i in list_plian:
                list_cipher = slice_code(i, 8)
                for j in list_cipher:
                    res = res + chr(int('0b' + j, base=0))

        elif mode == 'e':
            content = transform(content, 'b').replace(' ', '')
            if len(content) % 24 != 0:
                content += '0' * (24 - len(content) % 24)  # polishing

            list_plian = slice_code(content, 24)
            for i in list_plian:
                list_cipher = slice_code(i, 6)
                for j in list_cipher:
                    res = res + xxcode[int('0b' + j, base=0)]

    return res


def uuencode(content, mode):
    if content == '':
        return '[!] The content is NULL!'
    else:
        res = ''
        if mode == 'd':
            list_cipher = ''
            for i in content:
                list_cipher += '{:06b}'.format(ord(i) - 32)

            list_plian = slice_code(list_cipher, 24)
            for i in list_plian:
                list_cipher = slice_code(i, 8)
                for j in list_cipher:
                    res = res + chr(int('0b' + j, base=0))

        elif mode == 'e':
            content = transform(content, 'b').replace(' ', '')
            if len(content) % 24 != 0:
                content += '0' * (24 - len(content) % 24)  # polishing

            list_plian = slice_code(content, 24)
            for i in list_plian:
                list_cipher = slice_code(i, 6)
                for j in list_cipher:
                    res = res + chr(int('0b' + j, base=0) + 32)
    return res


def shellcode(content, mode):
    if content == '':
        return '[!] The content is NULL!'
    else:
        res = ''
        content = process(content)
        if mode == 'd':
            content = content.split('\\x')
            for i in content:
                res = res + int(i, base=16)
        elif mode == 'e':
            for i in content:
                res = res + hex(int(ord(i))).replace('0x', '\\x')
        return res


def uniencode(content, mode, prefix):
    res = ''
    if mode == 'd':
        content = process(''.join(content.split(prefix)))
        if prefix != '&#':
            content = slice_code(''.join(content), 4)
            for i in content:
                res += chr(int(i, base=16))
        else:
            content = slice_code(''.join(content), 5)
            for i in content:
                res += chr(int(i))

    elif mode == 'e':
        for i in content:
            if prefix in ('&#'):  # Dec;
                res = res + prefix + '{:05d}'.format(int(ord(i))) + ';'
            elif prefix in ('&#x'):  # Hex;
                res = res + prefix + '{:04x}'.format(int(ord(i))) + ';'
            elif prefix in ('\\U', '\\U+'):
                res = res + prefix + '{:04x}'.format(int(ord(i)))
            else:
                pass
    return res


def base(content, mode, bit):
    try:
        if bit == 64:
            return base64.b64decode(content).decode(
                'utf-8') if mode == 'd' else base64.b64encode(
                    content.encode('utf-8')).decode('utf-8')
        elif bit == 32:
            return base64.b32decode(content).decode(
                'utf-8') if mode == 'd' else base64.b32encode(
                    content.encode('utf-8')).decode('utf-8')
        elif bit == 16:
            return base64.b16decode(content).decode(
                'utf-8') if mode == 'd' else base64.b16encode(
                    content.encode('utf-8')).decode('utf-8')
    except:
        print('[!] The content is invalid!')
        sys.exit()
    else:
        return '[!] The content is NULL!'


def urlencode(content, mode):
    if content == '':
        return '[!] The content is NULL!'
    else:
        return urllib.parse.unquote(
            content) if mode == 'd' else urllib.parse.quote(content)


# HTML entity encoding
def html(content, mode):
    if content == '':
        return '[!] The content is NULL!'
    else:
        return HTMLParser.HTMLParser().unescape(
            content) if mode == 'd' else cgi.escape(content)


def quoted_printable(content, mode):
    if content == '':
        return '[!] The content is NULL!'
    else:
        return quopri.decodestring(
            content) if mode == 'd' else quopri.encodestring(content)


def bubble(content, mode):
    return bubblepy.BubbleBabble().decode(
        content) if mode == 'd' else bubblepy.BubbleBabble().encode(content)


# TODO
def version():
    print('Version: 0.4')
    print('Github: https://github.com/Palmcivet/CTF-tools')
    print('Author: Palm Civet')


def usage():
    print('''
Usage:
    -e --encode <code>  解码
    -d --decode <code>  编码
        base64      Base64
        base32      Base32
        base16      Base16
        sc          Shellcode
        xx          XXencode
        uu          UUencode
        qp          Quoted-Printable
        n2s         Number to String
        url         URLencode
        html        HTML entity encoding
        bubble      BubbleBubble
    -r --reverse        反转字符串
    -u --unicode        Unicode 编码
    -a --auto           列出字符串信息
    -h --help           查看帮助信息
    -v --version        查看版本信息

Example:
$ python3 ctf-code.py -a Y3RmX2NvZgk
$ python3 ctf-code.py -d base64 Y3RmX2NvZGU=
        ''')


# count the length
def init(content):
    print('[-] Rawtext: %s' % (content))
    print('[-] Length:  %d' % (len(content)))

    for i in content:
        for k in word:
            if i == k:
                word[k] += 1

    sort_word = sorted(word.items(), key=lambda d: (d[1], d[0]), reverse=True)

    print('--------------- Word Frequency ---------------')
    for (i, j) in sort_word:
        if j != 0:
            print('[+] %s:  %s' % (i, j))

    print('----------------------------------------------')


def auto(content):
    print('==============================================')
    if content.isalnum():
        init(content)
        for fmt in ('bin', 'oct', 'dec', 'hex'):
            print('[+] %s:  %s' %
                  (fmt.upper(), transform(process(content), fmt)))
    elif content.isprintable():
        for fmt in ('bin', 'oct', 'dec', 'hex'):
            print('[+] %s:  %s' %
                  (fmt.upper(), transform(process(content), fmt)))
    else:
        print('[!] Invalid Text!')
        sys.exit()
    print('==============================================')
    sys.exit()


def main(arg_list):
    try:
        opts, args = getopt.getopt(arg_list, 'hvraue:d:', [
            'help', 'version', 'reverse', 'auto', 'unicode', 'encode=',
            'decode='
        ])
    except getopt.GetoptError:
        print('[!] Invalid Option!')
        print('Use -h or --help for usage.')
        sys.exit()

    empty = False
    try:
        text_raw = args[0]
    except Exception as e:
        empty = True
    finally:
        text_res = ''

    for opt, arg in opts:
        if opt in ('-r', '--reverse'):
            if not empty:
                print('==============================================')
                print('[-] Raw:         %s' % text_raw)
                print('[-] Reversed:    %s' % text_raw[::-1])
                print('==============================================')
            else:
                print('[!] The input text is empty!')
            sys.exit()
        elif opt in ('-u', '--unicode'):
            print('==============================================')
            print('[-] Raw\t: %s' % text_raw)
            for prefix in ('\\U', '\\U+', '&#x', '&#'):
                print('[+] %s\t: %s' %
                      (prefix, uniencode(text_raw, 'e', prefix)))
            print('==============================================')
            sys.exit()
        elif opt in ('-h', '--help'):
            usage()
            sys.exit()
        elif opt in ('-v', '--version'):
            version()
            sys.exit()
        else:
            pass

    if empty:
        usage()
        sys.exit()

    for opt, arg in opts:
        if opt in ('-a', '--auto'):
            text_res = auto(text_raw)
        elif opt in ('-e', '--encode', '-d', '--decode'):
            try:
                mode = opt.replace('-', '')[0]
            except:
                print('[!] Invalid Argument: %s' % opt)

            if arg == 'base64':
                text_res = base(text_raw, mode, 64)
            elif arg == 'base32':
                text_res = base(text_raw, mode, 32)
            elif arg == 'base16':
                text_res = base(text_raw, mode, 16)
            elif arg == 'url':
                text_res = urlencode(text_raw, mode)
            elif arg == 'html':
                text_res = html(text_raw, mode)
            elif arg == 'qp':
                text_res = quoted_printable(text_raw, mode)
            elif arg == 'bubble':
                text_res = bubble(text_raw, mode)
            elif arg == 'n2s':
                text_res = n2s(text_raw, mode)
            elif arg == 'sc':
                text_res = shellcode(text_raw, mode)
            elif arg == 'uu':
                text_res = uuencode(text_raw, mode)
            elif arg == 'xx':
                text_res = xxencode(text_raw, mode)
            else:
                print('[!] Unsupported Mode: %s' % arg)
                sys.exit()

    print('==============================================')
    print('[-] Raw\t: %s' % text_raw)
    print('[-] Result\t: %s' % text_res)
    print('==============================================')


if __name__ == "__main__":

    alphabet_C = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    alphabet_L = 'abcdefghijklmnopqrstuvwxyz'
    figure = '0123456789'
    ascii_sybmol = {
        '\"': '&quot;',
        '\'': '&apos;',
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
    }
    iso_symbol = {
        '¥': '&yen;',
        '§': '&setc;',
        '©': '&copy;',
        '®': '&reg;',
        '±': '&plusmn;',
        'µ': '&micro;',
        '×': '&times;',
        '÷': '&divide;'
    }

    word = dict(
        zip(alphabet_C + alphabet_L + figure,
            (0 for x in range(len(alphabet_C + alphabet_L + figure)))))

    main(sys.argv[1:])
