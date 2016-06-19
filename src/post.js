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
	return x;
}));
