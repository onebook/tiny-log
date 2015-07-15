[![NPM version][npm-img]][npm-url]
[![Build status][travis-img]][travis-url]
[![Test coverage][coveralls-img]][coveralls-url]
[![License][license-img]][license-url]
[![Dependency status][david-img]][david-url]

### tiny-log
a tiny logger for node.js, base on [logfilestream](https://github.com/node-modules/logfilestream)

### example

```js
const tinyLog = require('tiny-log');
const logger = tinyLog({
  std: true,
  name: 'example',
  dir: __dirname,
  duration: 60000,
  levels: ['log', 'info', 'error']
});

logger.log('example');
logger.info('hello world');
logger.error(new Error('example'));
```

#### options

* dir - log file dir
* name - log file name prefix, default `''`
* std - output to std ? default `false`
* file - output to file ? default `true`
* trace - trace stack, default `false`
* boundary - log boundary, default `os.EOL`
* levels - log levels, default `['info', 'error']`
* duration - log file duration, default `86400000`, one day

### License
MIT

[npm-img]: https://img.shields.io/npm/v/tiny-log.svg?style=flat-square
[npm-url]: https://npmjs.org/package/tiny-log
[travis-img]: https://img.shields.io/travis/onebook/tiny-log.svg?style=flat-square
[travis-url]: https://travis-ci.org/onebook/tiny-log
[coveralls-img]: https://img.shields.io/coveralls/onebook/tiny-log.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/onebook/tiny-log?branch=master
[license-img]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[david-img]: https://img.shields.io/david/onebook/tiny-log.svg?style=flat-square
[david-url]: https://david-dm.org/onebook/tiny-log
