# mozjpeg-js
Implementation of [MozJPEG](https://github.com/mozilla/mozjpeg) in pure JavaScript, using Emscripten

# Usage
```
$ npm i -S mozjpeg-js
```

Call `mozjpeg.encode` with a typed array or buffer of data and an arguments object:
```javascript
const mozjpeg = require("mozjpeg-js");
const fs = require("fs");

const input = fs.readFileSync("in.ppm");
const out = mozjpeg.encode(input, { quality: 85 });
// out = { data: <mozjpeg output>, stderr: <cjpeg stderr> }

console.error(out.stderr);
fs.writeFileSync("out.jpg", out.data);
```

Alternatively, you may specify arguments as an array:
```javascript
const input = fs.readFileSync("in.ppm");
const out = mozjpeg.encode(input, ["-quality", "85"]);
...

```

You may use any options available in mozjpeg's cjpeg command line utility.
