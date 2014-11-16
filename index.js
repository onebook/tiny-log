'use strict';

var logstream = require('logfilestream'),
  assert = require('assert'),
  util = require('util'),
  os = require('os');

var EOL = os.EOL;

module.exports = Logger;

function Logger(options) {
  if (!(this instanceof Logger)) return new Logger(options);

  assert(options, 'options required');
  assert(options.dir, 'dir required');

  var logdir = options.dir,
    name = options.name || '',
    std = options.std || false,
    file = options.file || true,
    buffer = options.buffer || 1000,
    duration = options.duration || 86400000, // 1 day
    levels = options.levels || ['info', 'error'],
    format = options.format || '{pid}-YYYY-MM-DD[.log]';

  var self = this;

  levels.forEach(function(level) {
    var log = logstream({
      logdir: logdir,
      buffer: buffer,
      duration: duration,
      nameformat: '[' + name + ']-[' + level + ']-' + format
    });

    self[level] = function(message) {
      if (file) {
        log.write(now() + EOL);
        log.write(formate.apply(null, arguments));
      }
      if (std) {
        if (message instanceof Error) {
          console.error(now() + EOL);
          console.error(inspect.apply(null, arguments));
        } else {
          console.log(now() + EOL);
          console.log(inspect(message));
        }
      }
    };
  });
}

function errorInfo(error) {
  var info = {
    name: error.name || '',
    code: error.code || '',
    status: error.status || '',
    message: error.message || '',
    stack: error.stack || ''
  };
  return info;
}

function inspect(message) {
  if (!message) {
    return EOL;
  }

  if (typeof message === 'string') {
    return util.format.apply(util, arguments) + EOL;
  }

  if (message instanceof Error) {
    message = errorInfo(message);
  }

  if (typeof message === 'object') {
    return util.inspect(message) + EOL;
  }

  return message + EOL;
}

function formate(message) {
  if (!message) {
    return EOL;
  }

  if (typeof message === 'string') {
    return util.format.apply(util, arguments) + EOL;
  }

  if (message instanceof Error) {
    var info = errorInfo(message);
    var template = 'Error: ' + EOL +
      'name: %s' + EOL +
      'code: %s' + EOL +
      'status: %s' + EOL +
      'message: %s' + EOL +
      'stack: %s' + EOL;
    return util.format(template, info.name, info.code, info.status, info.message, info.stack) + EOL;
  }

  return JSON.stringify(message) + EOL;
}

function now() {
  return new Date();
}
