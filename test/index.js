'use strict'

const resolve = require('path').resolve
const assert = require('assert')
const tinyLog = require('..')
const fs = require('fs')

describe('# tiny-log', function() {
  it('add log', function(done) {
    let logger = tinyLog({
      std: true,
      buffer: 10,
      name: 'test',
      dir: __dirname,
      duration: 60000,
      nameFormat: '[test.log]',
      levels: ['log', 'info', 'error']
    })

    logger.log()
    logger.log(88)
    logger.log('test')
    logger.log('hello %s, your point is %d.', 'haoxin', 18)
    logger.log({
      name: 'log'
    })
    logger.info('hello world')
    logger.error(new Error('test'))

    setTimeout(done, 100)
  })

  it('check log', function() {
    assert(fs.readFileSync(resolve(__dirname, 'test-log-test.log'), 'utf8').includes('test'))
    assert(fs.readFileSync(resolve(__dirname, 'test-info-test.log'), 'utf8').includes('hello world'))
    assert(fs.readFileSync(resolve(__dirname, 'test-error-test.log'), 'utf8').includes('message: test'))
  })

  it('clean', function() {
    [
      'test-log-test.log',
      'test-info-test.log',
      'test-error-test.log'
    ].forEach(function(filename) {
      try {
        fs.unlinkSync(resolve(__dirname, filename))
      } catch (e) {}
    })
  })
})
