function toUint8Array(buffer) {
	var ab = new ArrayBuffer(buffer.length);
	var view = new Uint8Array(ab);
	for (var i = 0; i < buffer.length; ++i) {
		view[i] = buffer[i];
	}
	return view;
}

function toBuffer(ab) {
	var buffer = new Buffer(ab.byteLength);
	var view = new Uint8Array(ab);
	for (var i = 0; i < buffer.length; ++i) {
		buffer[i] = view[i];
	}
	return buffer;
}

module.exports = function(file, options) {
	// file: Buffer containing file in PPM, PGM, BMP, or Targa format.
	// options: hash containing options to pass to cjpeg
	// returns: file contents?

	var stdout = "";
	var stderr = "";

	var args = ["-outfile", "/output.jpg"];

	for (var key in options) {
		if (!options.hasOwnProperty(key)) continue;

		if (options[key]) {
			args.push("-" + key);
			if (typeof options[key] !== "boolean") {
				// option has a value
				args.push(String(options[key]));
			}
		}
	}

	args.push("/input");

	var Module = {
		"print": function(text) {
			stdout += text;
		},
		"printErr": function(text) {
			stderr += text;
		},
		"preRun": [function() {
			FS.writeFile("/input", toUint8Array(file), {
				encoding: "binary"
			});
		}],
		"arguments": args,
		"ENVIRONMENT": "SHELL" // maximum compatibility?
	};

