Suppress css modules while import/require css/less/sass modules in js file.

## Install
```js
npm install --save-dev babel-plugin-suppress-css-modules
```

## Usage

configure `.babelrc` file
```js
{
  "env": {
    "babel": {
      "plugins": [
        ["babel-plugin-suppress-css-modules", { 
            extensions: [".css", ".less", ".scss"] /*default: ".css", ".less", ".scss"*/ 
        }]
      ]
    }
  }
}
```

source file `src.js`
```js
import "./css.css";
import "./less.less";
import "./scss.scss";

const k = (x) => {};
function xx() {}

xx();
k("x");

require("./css1.css");
const x = require("./less1.less");
```

output file `output.js`
```js
"use strict";

var k = function k(x) {};
function xx() {}

xx();
k("x");
```