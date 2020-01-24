/**
 * 修改了 quoted-printable 源码
 * Github: https://github.com/mathiasbynens/quoted-printable
 */

const decode = (input) => {
	return input
		.replace(/[\t\x20]$/gm, '')
		.replace(/=(?:\r\n?|\n|$)/g, '')
		.replace(/=([a-fA-F0-9]{2})/g,
			($1) => String.fromCharCode(parseInt($1, 16))
		);
};

const handleTrailingCharacters = (string) => {
	return string
		.replace(/\x20$/, '=20')
		.replace(/\t$/, '=09')
};

const encode = (string) => {
	let regexUnsafeSymbols = /<%= unsafeSymbols %>/g;
	let encoded = string.replace(regexUnsafeSymbols, function (symbol) {
		if (symbol > '\xFF') {
			throw RangeError(
				'`quotedPrintable.encode()` expects extended ASCII input only. ' +
				'Don\u2019t forget to encode the input first using a character ' +
				'encoding like UTF-8.'
			);
		}
		let codePoint = symbol.charCodeAt(0);
		let hexadecimal = codePoint.toString(16).toUpperCase();
		return '=' + ('0' + hexadecimal).slice(-2);
	});

	let lines = encoded.split(/\r\n?|\n/g);
	let lineIndex = -1;
	let lineCount = lines.length;
	let result = [];
	while (++lineIndex < lineCount) {
		let line = lines[lineIndex];
		var LINE_LENGTH = 75;
		let index = 0;
		let length = line.length;
		while (index < length) {
			var buffer = encoded.slice(index, index + LINE_LENGTH);
			if (/=$/.test(buffer)) {
				buffer = buffer.slice(0, LINE_LENGTH - 1);
				index += LINE_LENGTH - 1;
			} else if (/=[A-F0-9]$/.test(buffer)) {
				buffer = buffer.slice(0, LINE_LENGTH - 2);
				index += LINE_LENGTH - 2;
			} else {
				index += LINE_LENGTH;
			}
			result.push(buffer);
		}
	}

	let lastLineLength = buffer.length;
	if (/[\t\x20]$/.test(buffer)) {
		result.pop();
		if (lastLineLength + 2 <= LINE_LENGTH + 1) {
			result.push(
				handleTrailingCharacters(buffer)
			);
		} else {
			result.push(
				buffer.slice(0, lastLineLength - 1),
				handleTrailingCharacters(
					buffer.slice(lastLineLength - 1, lastLineLength)
				)
			);
		}
	}

	// `Quoted-Printable` uses CRLF.
	return result.join('=\r\n');
};

/**
 * 加密仍存在 bug
 * @param {String} raw - 原始字符串
 * @param {String} mode - 模式：`decode`/`encode`
 * @returns {String} 返回字符串
 */
const quotedPrintable = (raw, mode) => {
	if (mode == 'decode') {
		return decode(raw);
	}
	else if (mode == 'encode') {
		return encode(raw);
	}
	else {
		return raw;
	}
};

export { quotedPrintable };