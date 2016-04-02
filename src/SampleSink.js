import {SampleHold} from './SampleHold'

export class SampleSink {
  constructor (fn, source, sink) {
    this.fn = fn
    this.source = source
    this.sink = sink
    this.active = false
    this.hold = new SampleHold(this)
  }

  event (time, value) {
    if (this.hold.hasValue) {
      this.sink.event(time, this.fn(value, this.hold.value))
    }
  }

  error (time, err) {
    return this.sink.error(time, err)
  }

  end (time, value) {
    return this.sink.end(time, value)
  }
}
