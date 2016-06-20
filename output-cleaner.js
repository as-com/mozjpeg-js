// Processes the emscripten output to remove node.js detection stuff and other things that screw up packaging
const fs = require("fs");

function processStuff(t) {
	return t
		.replace(`require('fs')`, "(undefined)")
		.replace(`require('path')`, "(undefined)")
		.replace(`require('crypto')`, "(undefined)")
		.replace(/ENVIRONMENT_IS_SHELL(?!(?:\s+)?=[^=])/g, "(true)")
		.replace(/ENVIRONMENT_IS_(?:WEB|WORKER|NODE)(?!(?:\s+)?=[^=])/g, "(false)");
}

// console.log(process.argv);
fs.writeFileSync(process.argv[2], processStuff(fs.readFileSync(process.argv[2], "utf-8")));