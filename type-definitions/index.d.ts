import {Stream} from "most";

// all 3 args
export function sample<A, B, C>(f: (a: A, b: B) => C, sampler: Stream<A>, s: Stream<B>): Stream<C>;
// first arg then 2
export function sample<A, B, C>(f: (a: A, b: B) => C): (sampler: Stream<A>, s: Stream<B>) => Stream<C>;
// first 2 then 1
export function sample<A, B, C>(f: (a: A, b: B) => C, sampler: Stream<A>): (s: Stream<B>) => Stream<C>;
// 1 arg at a time
export function sample<A, B, C>(f: (a: A, b: B) => C): (sampler: Stream<A>) => (s: Stream<B>) => Stream<C>;


// all 3 args
export function sampleArray<A, B, C>(f: (a: A, b: B[]) => C, sampler: Stream<A>, streams: Stream<B>[]): Stream<C>;
// first arg then 2
export function sampleArray<A, B, C>(f: (a: A, b: B[]) => C): (sampler: Stream<A>, s: Stream<B>[]) => Stream<C>;
// first 2 then 1
export function sampleArray<A, B, C>(f: (a: A, b: B[]) => C, sampler: Stream<A>): (s: Stream<B>[]) => Stream<C>;
// 1 arg at a time
export function sampleArray<A, B, C>(f: (a: A, b: B[]) => C): (sampler: Stream<A>) => (s: Stream<B>[]) => Stream<C>;
