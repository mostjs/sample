export class SampleHold {
  constructor (sink) {
    this.sink = sink
    this.hasValue = false
  }

  event (time, value) {
    this.value = value
    this.hasValue = true
  }

  end () {}

  error (time, err) {
    this.sink.error(time, err)
  }
}
