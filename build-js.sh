#!/bin/sh
cd mozjpeg
emconfigure ./configure --without-simd --without-turbojpeg CFLAGS="-O3"
emmake make
cp .libs/cjpeg ../cjpeg.bc
cd ..
emcc -O3 --pre-js src/pre.js --post-js src/post.js --memory-init-file 0 cjpeg.bc -o src/cjpeg.js -L'./mozjpeg/.libs' -ljpeg