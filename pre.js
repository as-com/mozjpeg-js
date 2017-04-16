module.exports = function(file, options) {
	// file: Typed array containing file in PPM, PGM, BMP, or Targa format.
	// options: hash containing options to pass to cjpeg
	// returns: object, data = typed array with file output, stderr = command output

	var stdout = "";
	var stderr = "";

	var args = ["-outfile", "/output.jpg"];

	for (var key in options) {
		if (typeof options[key] == 'string') {
			args.push("-" + key);
			args.push(String(options[key]));
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
			FS.writeFile("/input", file, {
				encoding: "binary"
			});
		}],
		"arguments": args,
		"ENVIRONMENT": "SHELL" // maximum compatibility?
	};

