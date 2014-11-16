'use strict';

var assert = require('assert'),
  tinyLog = require('..'),
  path = require('path'),
  resolve = path.resolve,
  fs = require('fs');

describe('# tiny-log', function() {
  it('add log', function(done) {
    var logger = tinyLog({
      std: true,
      name: 'test',
      format: '[test.log]',
      dir: __dirname,
      buffer: 10,
      duration: 60000,
      levels: ['log', 'info', 'error']
    });

    logger.log();
    logger.log(88);
    logger.log('test');
    logger.log({
      name: 'log'
    });
    logger.info('hello world');
    logger.error(new Error('test'));

    setTimeout(done, 100);
  });

  it('check log', function() {
    assert(fs.readFileSync(resolve(__dirname, 'test-log-test.log'), 'utf8').contains('test'));
    assert(fs.readFileSync(resolve(__dirname, 'test-info-test.log'), 'utf8').contains('hello world'));
    assert(fs.readFileSync(resolve(__dirname, 'test-error-test.log'), 'utf8').contains('message: test'));
  });

  it('clean', function() {
    [
      'test-log-test.log',
      'test-info-test.log',
      'test-error-test.log'
    ].forEach(function(filename) {
      try {
        fs.unlinkSync(resolve(__dirname, filename));
      } catch (e) {}
    });
  });
});
