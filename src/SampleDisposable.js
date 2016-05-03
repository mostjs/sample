export class SampleDisposable {
  constructor (samplerDisposable, sourceDisposable) {
    this.samplerDisposable = samplerDisposable
    this.sourceDisposable = sourceDisposable
  }

  dispose () {
    return Promise.all([
      this.samplerDisposable.dispose(),
      this.sourceDisposable.dispose()
    ])
  }
}
