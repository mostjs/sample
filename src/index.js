/** @license MIT License (c) copyright 2016 original author or authors */

import { Stream, combineArray } from 'most'
import { curry3 } from '@most/prelude'

import { SampleSource } from './SampleSource'

export const sample = curry3((f, sampler, stream) =>
  new Stream(new SampleSource(f, sampler, stream)))

const arrayId = (...values) => values

export const sampleArray = curry3((f, sampler, arrayOfStreams) =>
  sample(f, sampler, combineArray(arrayId, arrayOfStreams)))
