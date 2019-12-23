# CTF-Tool

This is a simple tool for encode and decode

## Basic coding
Use `-a --auto`, list the information of **string**.

```bash
$ python3 ctf-code.py -a ctf-tool
==============================================
[+] Rawtext: ctf-tool
[+] Length:  8
--------------- Word Frequency ---------------
[+] t:  2
[+] o:  2
[+] l:  1
[+] f:  1
[+] c:  1
----------------------------------------------
[+] BIN:  1100011 1110100 1100110 101101 1110100 1101111    1101111 1101100
[+] OCT:  143 164 146 55 164 157 157 154
[+] DEC:  99 116 102 45 116 111 111 108
[+] HEX:  63 74 66 2d 74 6f 6f 6c
[+] STR:  c t f - t o o l
==============================================
```

## Unicode
Use `-u --unicode`, encode the string.

## Decode/Encode
The following encodings are currently supported:
1. URLencode
2. Shellcode
3. UUencode
4. XXencode
5. Base64/32/16
6. BubbleBubble
7. Number to String
8. Quoted-Printable
9. HTML entity encoding

## Cipher
- Virginia code

## More
More features are being added.