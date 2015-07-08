'use strict'

const logstream = require('logfilestream')
const assert = require('assert')
const util = require('util')
const os = require('os')
const slice = [].slice
const EOL = os.EOL

module.exports = Logger

function Logger(options) {
  if (!(this instanceof Logger)) return new Logger(options)

  assert(options, 'options required')
  assert(options.dir, 'dir required')

  let logdir = options.dir
  let name = options.name || ''
  let std = options.std || false
  let file = options.file || true
  let buffer = options.buffer || 1000
  let boundary = options.boundary || EOL
  let duration = options.duration || 86400000 // 1 day
  let levels = options.levels || ['info', 'error']
  let nameFormat = options.nameFormat || '{pid}-YYYY-MM-DD[.log]'

  let self = this

  levels.forEach(function(level) {
    let log = logstream({
      logdir: logdir,
      buffer: buffer,
      duration: duration,
      nameformat: `[${name}]-[${level}]-${nameFormat}`
    })

    self[level] = function(message) {
      let args = slice.apply(arguments)

      if (file) {
        log.write(boundary)
        log.write(now() + EOL)
        log.write(formate.apply(null, args))
      }

      if (std) {
        if (message instanceof Error) {
          console.error(boundary)
          console.error(now() + EOL)
          console.log(inspect(message))
        } else {
          console.log(boundary)
          console.log(now() + EOL)
          console.error(inspect.apply(null, args))
        }
      }
    }
  })
}

function errorInfo(error) {
  let info = {
    name: error.name || '',
    code: error.code || '',
    status: error.status || '',
    message: error.message || '',
    stack: error.stack || ''
  }

  return info
}

function inspect(message) {
  let args = slice.apply(arguments)

  if (!message) {
    return EOL
  }

  if (typeof message === 'string') {
    return util.format.apply(util, args) + EOL
  }

  if (message instanceof Error) {
    message = errorInfo(message)
  }

  if (typeof message === 'object') {
    return util.inspect(message) + EOL
  }

  return message + EOL
}

function formate(message) {
  let args = slice.apply(arguments)

  if (!message) {
    return EOL
  }

  if (typeof message === 'string') {
    return util.format.apply(util, args) + EOL
  }

  if (message instanceof Error) {
    let info = errorInfo(message)
    let template = ['Error: ', 'name: %s', 'code: %s', 'status: %s', 'message: %s', 'stack: %s'].join(EOL) + EOL
    return util.format(template, info.name, info.code, info.status, info.message, info.stack) + EOL
  }

  return JSON.stringify(message) + EOL
}

function now() {
  return new Date()
}
