/** @license MIT License (c) copyright 2016 original author or authors */

import {Stream, combineArray} from 'most'
import {curry3} from '@most/prelude'

import {SampleSource} from './SampleSource'

export const sample = curry3((fn, sampler, stream) =>
  new Stream(new SampleSource(fn, sampler, stream)))

const arrayId = (...values) => values

export const sampleArray = curry3((fn, sampler, arrayOfStreams) =>
  sample(fn, sampler, combineArray(arrayId, arrayOfStreams)))
