import commonjs from "rollup-plugin-commonjs";

export default {
	input: "index.js",
	plugins: [commonjs()],
	output: [{
		file: "dist/mozjpeg.js",
		format: "umd",
		name: "mozjpeg"
	}, {
		file: "dist/mozjpeg.es6.js",
		format: "es",
		name: "mozjpeg"
	}]
};