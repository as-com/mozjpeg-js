	var file;
	try { 
		file = FS.readFile("/output.jpg");
	} catch (e) {
		throw new Error("No output: " + stderr);
	}

	FS.unlink("/output.jpg");
	FS.unlink("/input");

	//console.log(file);
	return {
		"data": file,
		"stderr": stderr
	};
}