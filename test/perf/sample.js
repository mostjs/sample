'use strict'
var Benchmark = require('benchmark')
var most = require('most')
var rx = require('rx')
var rxjs = require('rxjs')
var runners = require('./runners')

function buildArray (n) {
  var a = new Array(n)
  for (var i = 0; i < n; ++i) {
    a[i] = i
  }
  return a
}

var mn = runners.getIntArg2(1000000, 100)
const m = mn[0]
const n = mn[1]
var a = buildArray(m)
const as = buildArray(n)
const mosts = as.map(most.of)
const rxjss = as.map(x => rxjs.Observable.of(x))
const rxs = as.map(x => rx.Observable.of(x))

var suite = Benchmark.Suite('sample ' + m + ' x ' + n + ' integers')
var options = {
  defer: true,
  onError: function (e) {
    e.currentTarget.failure = e.error
  }
}

var sampleArray = require('../../dist/sample.min').sampleArray

const combineSamples = (x, a) => x + a.length

function sum (x, y) {
  return x + y
}

suite
  .add('most', function (deferred) {
    runners.runMost(deferred, sampleArray(combineSamples, most.from(a), mosts).reduce(sum, 0))
  }, options)
  .add('rxjs', function (deferred) {
    runners.runRx5(deferred, rxjs.Observable.from(a).withLatestFrom(rxjss, combineSamples).reduce(sum, 0))
  }, options)
  .add('rx', function (deferred) {
    runners.runRx(deferred, rx.Observable.from(a).withLatestFrom(rxs, combineSamples).reduce(sum, 0))
  }, options)

runners.runSuite(suite)
