#!/bin/sh
cd deps/mozjpeg
emconfigure ./configure --without-simd --without-turbojpeg CFLAGS="-O3"
emmake make
cp .libs/cjpeg ../../cjpeg.bc
cd ../..
emcc -O3 --closure 1 --pre-js src/pre.js --post-js src/post.js -s "EXPORTED_RUNTIME_METHODS=[]" -s ELIMINATE_DUPLICATE_FUNCTIONS=1 -s ALLOW_MEMORY_GROWTH=1 --memory-init-file 0 cjpeg.bc -o src/cjpeg.js -L'./deps/mozjpeg/.libs' -ljpeg