# !/usr/bin/python3
# coding=utf-8
# Github: https://github.com/Palmcivet/CTF-tools
# Author: Palm Civet

import sys
import getopt


def init_stack(base='0x400000', ebp=0):
    pass


def main(arg_list):
    try:
        opts, args = getopt.getopt(arg_list, 'hv', ['help', 'version'])
    except getopt.GetoptError:
        print('[!] Invalid Option!')
        print('Use -h or --help for usage.')
        sys.exit()

    for opt, arg in opts:
        if opt in ('-h', '--help'):
            pass


if __name__ == "__main__":
    main(sys.argv[1:])
