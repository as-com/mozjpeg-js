import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: 'index.js',
	plugins: [commonjs()],
	moduleName: "mozjpeg",
	targets: [{
		dest: 'dist/mozjpeg.js',
		format: 'umd'
	}, {
		dest: 'dist/mozjpeg.es6.js',
		format: 'es'
	}]
};