/** @license MIT License (c) copyright 2016 original author or authors */

import {describe, it} from 'mocha'
import assert from 'assert'
import sinon from 'sinon'

import {observe, of, empty, take, skip, periodic, throwError} from 'most'
import {sampleArray} from '../src/index'

const sentinel = {value: 'sentinel'}

describe('@most/sample', () => {
  describe('sampleArray', () => {
    it('should be empty if sampler is empty', () => {
      const spy = sinon.spy()
      const s = sampleArray(spy, empty(), [of(sentinel), of(123)])

      const observer = sinon.spy()
      return observe(observer, s)
        .then(() => {
          assert.strictEqual(spy.notCalled, true)
          assert.strictEqual(observer.notCalled, true)
        })
    })

    it('should pass in the sampler value', () => {
      const fn = (sampler, [s1, s2]) => ({sampler, s1, s2})
      const s = sampleArray(fn, of('sampler'), [of(1), of(2)])

      return observe(({sampler, s1, s2}) => {
        assert.strictEqual(sampler, 'sampler')
        assert.strictEqual(s1, 1)
        assert.strictEqual(s2, 2)
      }, s)
    })

    it('should sample the latest values', () => {
      const fn = (sampler, [s1, s2]) => ({sampler, s1, s2})
      const add = (x, y) => x + y
      const s1 = periodic(2, 5).scan(add, 0)
      const s2 = periodic(2, 10).scan(add, 0)

      const sampler = take(5, periodic(5, 1))

      const s = sampleArray(fn, sampler, [s1, s2])

      return observe(({sampler, s1, s2}) => {
        assert.strictEqual(sampler, 1)
        assert.strictEqual(s1, 50)
        assert.strictEqual(s2, 100)
      }, skip(4, s))
    })

    it('should repeat last value after source ends', () => {
      const s = sampleArray(Array, periodic(1, 1), [of(sentinel), of(123)])

      return observe(x => {
        assert.deepEqual(x, [1, [sentinel, 123]])
      }, take(3, s))
    })

    it('should end if an error is thrown', () => {
      const error = new Error('fail')
      const s1 = of(sentinel)
      const s2 = throwError(error)
      const sampler = periodic(1, 1)
      const s = sampleArray(Array, sampler, [s1, s2])

      observe(assert.fail, s)
        .catch(err => {
          assert.strictEqual(err, error)
        })
    })

    it('should do nothing if arrayOfStreams never emits', () => {
      const s = sampleArray(Array, take(5, periodic(1, 1)), [empty(), empty()])
      const observer = sinon.spy()
      return observe(observer, s).then(() => {
        assert.strictEqual(observer.notCalled, true)
      })
    })

    it('should be curried by default', () => {
      const sampleByArray = sampleArray(Array)
      const samplePerMS = sampleByArray(take(5, periodic(1, 1)))
      const s = samplePerMS([of(1), of(2)])

      return observe(([sampler, [s1, s2]]) => {
        assert.strictEqual(sampler, 1)
        assert.strictEqual(s1, 1)
        assert.strictEqual(s2, 2)
      }, s)
    })
  })
})
