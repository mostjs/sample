import {SampleSink} from './SampleSink'

export class SampleSource {
  constructor (fn, sampler, stream) {
    this.fn = fn
    this.sampler = sampler.source
    this.source = stream.source
  }

  run (sink, scheduler) {
    const sampleSink = new SampleSink(this.fn, this.source, sink)
    const samplerDisposable = this.sampler.run(sampleSink, scheduler)
    const sourceDisposable = this.source.run(sampleSink.hold, scheduler)

    return {
      dispose () {
        return Promise.all([
          samplerDisposable.dispose(),
          sourceDisposable.dispose()
        ])
      }
    }
  }
}
