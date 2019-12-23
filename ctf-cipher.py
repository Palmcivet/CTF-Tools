#-*-coding:utf-8-*-


def virginia(content, key, mode):
    ascii = 'abcdefghijklmnopqrstuvwxyz'
    res = ''
    len_key = len(key)
    len_content = len(content)

    if mode == 'e':
        i = 0
        while i < len_content:
            j = i % len_key
            k = ascii.index(key[j])
            m = ascii.index(content[i])
            res += ascii[(m + k) % 26]
            i += 1
    else:
        i = 0
        while i < len_content:
            j = i % len_key
            k = ascii.index(key[j])
            m = ascii.index(content[i])
            if m < k:
                m += 26
            res += ascii[m - k]
            i += 1
    return res

