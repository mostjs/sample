import { SampleHold } from './SampleHold'

export class SampleSink {
  constructor (f, source, sink) {
    this.sink = sink
    this.source = source
    this.f = f
    this.hold = new SampleHold(this)
  }

  event (time, value) {
    if (this.hold.hasValue) {
      const f = this.f
      this.sink.event(time, f(value, this.hold.value))
    }
  }

  error (time, err) {
    return this.sink.error(time, err)
  }

  end (time, value) {
    return this.sink.end(time, value)
  }
}
