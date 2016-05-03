import { SampleSink } from './SampleSink'
import { SampleDisposable } from './SampleDisposable'

export class SampleSource {
  constructor (f, sampler, stream) {
    this.source = stream.source
    this.sampler = sampler.source
    this.f = f
  }

  run (sink, scheduler) {
    const sampleSink = new SampleSink(this.f, this.source, sink)
    const samplerDisposable = this.sampler.run(sampleSink, scheduler)
    const sourceDisposable = this.source.run(sampleSink.hold, scheduler)

    return new SampleDisposable(samplerDisposable, sourceDisposable)
  }
}
