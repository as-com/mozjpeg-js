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

var stdout = "";
var stderr = "";

module.exports = function(file, options) {
	// file: Buffer containing file in PPM, PGM, BMP, or Targa format.
	// options: hash containing options to pass to cjpeg
	// returns: file contents?

	stdout = "";
	stderr = "";

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

	FS.writeFile("/input", toUint8Array(file), {
		encoding: "binary"
	});

	Module["callMain"](args);

	var file;
	try { 
		file = FS.readFile("/output.jpg");
	} catch (e) {
		return new Error("No output: " + stderr);
	}
	//console.log(file);
	return {
		"data": toBuffer(file.buffer),
		"stderr": stderr
	};
}

var Module = {
	"noInitialRun" : true,
	"noExitRuntime" : true,
	"print": function(text) {
		stdout += text;
	},
	"printErr": function(text) {
		stderr += text;
	},
	"ENVIRONMENT": "SHELL"
}

