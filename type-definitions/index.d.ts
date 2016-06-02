import {Stream} from "most";

// all 3 args
export function sample<A, B, C>(f: (a: A, b: B) => C, sampler: Stream<A>, s: Stream<B>): Stream<C>;
// first arg then 2
export function sample<A, B, C>(f: (a: A, b: B) => C): (sampler: Stream<A>, s: Stream<B>) => Stream<C>;
// first 2 then 1
export function sample<A, B, C>(f: (a: A, b: B) => C, sampler: Stream<A>): (s: Stream<B>) => Stream<C>;
// 1 arg at a time
export function sample<A, B, C>(f: (a: A, b: B) => C): (sampler: Stream<A>) => (s: Stream<B>) => Stream<C>;

export interface SampleArray {
  // 3 args
  <A, B1, C>(f: (a: A, others: [B1]) => C, sampler: Stream<A>, streams: [Stream<B1>]): Stream<C>;
  <A, B1, B2, C>(f: (a: A, others: [B1, B2]) => C, sampler: Stream<A>, streams: [Stream<B1>, Stream<B2>]): Stream<C>;
  <A, B1, B2, B3, C>(f: (a: A, others: [B1, B2, B3]) => C, sampler: Stream<A>, streams: [Stream<B1>, Stream<B2>, Stream<B3>]): Stream<C>;
  <A, B1, B2, B3, B4, C>(f: (a: A, others: [B1, B2, B3, B4]) => C, sampler: Stream<A>, streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>]): Stream<C>;
  <A, B1, B2, B3, B4, B5, C>(f: (a: A, others: [B1, B2, B3, B4, B5]) => C, sampler: Stream<A>, streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>, Stream<B5>]): Stream<C>;
  <A, B1, B2, B3, B4, B5, B6, C>(f: (a: A, others: [B1, B2, B3, B4, B5, B6]) => C, sampler: Stream<A>, streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>, Stream<B5>, Stream<B6>]): Stream<C>;
  <A, B1, B2, B3, B4, B5, B6, B7, C>(f: (a: A, others: [B1, B2, B3, B4, B5, B6, B7]) => C, sampler: Stream<A>, streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>, Stream<B5>, Stream<B6>, Stream<B7>]): Stream<C>;
  <A, B1, B2, B3, B4, B5, B6, B7, B8, C>(f: (a: A, others: [B1, B2, B3, B4, B5, B6, B7, B8]) => C, sampler: Stream<A>, streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>, Stream<B5>, Stream<B6>, Stream<B7>, Stream<B8>]): Stream<C>;
  // firest arg then 2 args
  <A, B1, C>(f: (a: A, others: [B1]) => C): (sampler: Stream<A>, streams: [Stream<B1>]) => Stream<C>;
  <A, B1, B2, C>(f: (a: A, others: [B1, B2]) => C): (sampler: Stream<A>, streams: [Stream<B1>, Stream<B2>]) => Stream<C>;
  <A, B1, B2, B3, C>(f: (a: A, others: [B1, B2, B3]) => C): (sampler: Stream<A>, streams: [Stream<B1>, Stream<B2>, Stream<B3>]) => Stream<C>;
  <A, B1, B2, B3, B4, C>(f: (a: A, others: [B1, B2, B3, B4]) => C): (sampler: Stream<A>, streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>]) => Stream<C>;
  <A, B1, B2, B3, B4, B5, C>(f: (a: A, others: [B1, B2, B3, B4, B5]) => C): (sampler: Stream<A>, streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>, Stream<B5>]) => Stream<C>;
  <A, B1, B2, B3, B4, B5, B6, C>(f: (a: A, others: [B1, B2, B3, B4, B5, B6]) => C): (sampler: Stream<A>, streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>, Stream<B5>, Stream<B6>]) => Stream<C>;
  <A, B1, B2, B3, B4, B5, B6, B7, C>(f: (a: A, others: [B1, B2, B3, B4, B5, B6, B7]) => C): (sampler: Stream<A>, streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>, Stream<B5>, Stream<B6>, Stream<B7>]) => Stream<C>;
  <A, B1, B2, B3, B4, B5, B6, B7, B8, C>(f: (a: A, others: [B1, B2, B3, B4, B5, B6, B7, B8]) => C): (sampler: Stream<A>, streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>, Stream<B5>, Stream<B6>, Stream<B7>, Stream<B8>]) => Stream<C>;
  // first 2 args then last arg
  <A, B1, C>(f: (a: A, others: [B1]) => C, sampler: Stream<A>): (streams: [Stream<B1>]) => Stream<C>;
  <A, B1, B2, C>(f: (a: A, others: [B1, B2]) => C, sampler: Stream<A>): (streams: [Stream<B1>, Stream<B2>]) => Stream<C>;
  <A, B1, B2, B3, C>(f: (a: A, others: [B1, B2, B3]) => C, sampler: Stream<A>): (streams: [Stream<B1>, Stream<B2>, Stream<B3>]) => Stream<C>;
  <A, B1, B2, B3, B4, C>(f: (a: A, others: [B1, B2, B3, B4]) => C, sampler: Stream<A>): (streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>]) => Stream<C>;
  <A, B1, B2, B3, B4, B5, C>(f: (a: A, others: [B1, B2, B3, B4, B5]) => C, sampler: Stream<A>): (streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>, Stream<B5>]) => Stream<C>;
  <A, B1, B2, B3, B4, B5, B6, C>(f: (a: A, others: [B1, B2, B3, B4, B5, B6]) => C, sampler: Stream<A>): (streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>, Stream<B5>, Stream<B6>]) => Stream<C>;
  <A, B1, B2, B3, B4, B5, B6, B7, C>(f: (a: A, others: [B1, B2, B3, B4, B5, B6, B7]) => C, sampler: Stream<A>): (streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>, Stream<B5>, Stream<B6>, Stream<B7>]) => Stream<C>;
  <A, B1, B2, B3, B4, B5, B6, B7, B8, C>(f: (a: A, others: [B1, B2, B3, B4, B5, B6, B7, B8]) => C, sampler: Stream<A>): (streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>, Stream<B5>, Stream<B6>, Stream<B7>, Stream<B8>]) => Stream<C>;
  // 1 arg at a time
  <A, B1, C>(f: (a: A, others: [B1]) => C): (sampler: Stream<A>) => (streams: [Stream<B1>]) => Stream<C>;
  <A, B1, B2, C>(f: (a: A, others: [B1, B2]) => C): (sampler: Stream<A>) => (streams: [Stream<B1>, Stream<B2>]) => Stream<C>;
  <A, B1, B2, B3, C>(f: (a: A, others: [B1, B2, B3]) => C): (sampler: Stream<A>) => (streams: [Stream<B1>, Stream<B2>, Stream<B3>]) => Stream<C>;
  <A, B1, B2, B3, B4, C>(f: (a: A, others: [B1, B2, B3, B4]) => C): (sampler: Stream<A>) => (streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>]) => Stream<C>;
  <A, B1, B2, B3, B4, B5, C>(f: (a: A, others: [B1, B2, B3, B4, B5]) => C): (sampler: Stream<A>) => (streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>, Stream<B5>]) => Stream<C>;
  <A, B1, B2, B3, B4, B5, B6, C>(f: (a: A, others: [B1, B2, B3, B4, B5, B6]) => C): (sampler: Stream<A>) => (streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>, Stream<B5>, Stream<B6>]) => Stream<C>;
  <A, B1, B2, B3, B4, B5, B6, B7, C>(f: (a: A, others: [B1, B2, B3, B4, B5, B6, B7]) => C): (sampler: Stream<A>) => (streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>, Stream<B5>, Stream<B6>, Stream<B7>]) => Stream<C>;
  <A, B1, B2, B3, B4, B5, B6, B7, B8, C>(f: (a: A, others: [B1, B2, B3, B4, B5, B6, B7, B8]) => C): (sampler: Stream<A>) => (streams: [Stream<B1>, Stream<B2>, Stream<B3>, Stream<B4>, Stream<B5>, Stream<B6>, Stream<B7>, Stream<B8>]) => Stream<C>;
}

export const sampleArray: SampleArray;
