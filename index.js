'use strict';

const logstream = require('logfilestream'),
  assert = require('assert'),
  util = require('util'),
  os = require('os');

const EOL = os.EOL;

module.exports = Logger;

function Logger(options) {
  if (!(this instanceof Logger)) return new Logger(options);

  assert(options, 'options required');
  assert(options.dir, 'dir required');

  let logdir = options.dir,
    name = options.name || '',
    std = options.std || false,
    file = options.file || true,
    buffer = options.buffer || 1000,
    boundary = options.boundary || EOL,
    duration = options.duration || 86400000, // 1 day
    levels = options.levels || ['info', 'error'],
    nameFormat = options.nameFormat || '{pid}-YYYY-MM-DD[.log]';

  let self = this;

  levels.forEach(function(level) {
    let log = logstream({
      logdir: logdir,
      buffer: buffer,
      duration: duration,
      nameformat: `[${name}]-[${level}]-${nameFormat}`
    });

    self[level] = function(message) {
      if (file) {
        log.write(boundary);
        log.write(now() + EOL);
        log.write(formate.apply(null, arguments));
      }
      if (std) {
        if (message instanceof Error) {
          console.error(boundary);
          console.error(now() + EOL);
          console.error(inspect.apply(null, arguments));
        } else {
          console.log(boundary);
          console.log(now() + EOL);
          console.log(inspect(message));
        }
      }
    };
  });
}

function errorInfo(error) {
  let info = {
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
    let info = errorInfo(message);
    let template = ['Error: ', 'name: %s', 'code: %s', 'status: %s', 'message: %s', 'stack: %s'].join(EOL) + EOL;
    return util.format(template, info.name, info.code, info.status, info.message, info.stack) + EOL;
  }

  return JSON.stringify(message) + EOL;
}

function now() {
  return new Date();
}
