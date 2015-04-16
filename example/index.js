'use strict';

const tinyLog = require('..');
const logger = tinyLog({
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
  logger.info({
    name: 'hello',
    desc: 'hello world'
  });
  logger.error(new Error('example'));
}, 500);
