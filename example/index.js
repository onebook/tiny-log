'use strict';

var tinyLog = require('..'),
  logger = tinyLog({
    std: true,
    name: 'example',
    dir: __dirname,
    duration: 60000, // logfilestream: duration >= one minute
    format: 'YYYY-MM-DD-HH-MM-SS[.log]',
    levels: ['log', 'info', 'error']
  });

setInterval(function() {
  logger.log('example');
  logger.info('hello world');
  logger.error(new Error('example'));
}, 500);
