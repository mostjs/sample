(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('@most/sample', ['exports', 'most', '@most/prelude'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('most'), require('@most/prelude'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.most, global.prelude);
    global.mostSample = mod.exports;
  }
})(this, function (exports, _most, _prelude) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.sampleArray = exports.sample = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var SampleHold = function () {
    function SampleHold(sink) {
      _classCallCheck(this, SampleHold);

      this.sink = sink;
      this.hasValue = false;
    }

    _createClass(SampleHold, [{
      key: 'event',
      value: function event(time, value) {
        this.value = value;
        this.hasValue = true;
      }
    }, {
      key: 'end',
      value: function end() {}
    }, {
      key: 'error',
      value: function error(time, err) {
        this.sink.error(time, err);
      }
    }]);

    return SampleHold;
  }();

  var SampleSink = function () {
    function SampleSink(f, source, sink) {
      _classCallCheck(this, SampleSink);

      this.sink = sink;
      this.source = source;
      this.f = f;
      this.hold = new SampleHold(this);
    }

    _createClass(SampleSink, [{
      key: 'event',
      value: function event(time, value) {
        if (this.hold.hasValue) {
          var f = this.f;
          this.sink.event(time, f(value, this.hold.value));
        }
      }
    }, {
      key: 'error',
      value: function error(time, err) {
        return this.sink.error(time, err);
      }
    }, {
      key: 'end',
      value: function end(time, value) {
        return this.sink.end(time, value);
      }
    }]);

    return SampleSink;
  }();

  var SampleDisposable = function () {
    function SampleDisposable(samplerDisposable, sourceDisposable) {
      _classCallCheck(this, SampleDisposable);

      this.samplerDisposable = samplerDisposable;
      this.sourceDisposable = sourceDisposable;
    }

    _createClass(SampleDisposable, [{
      key: 'dispose',
      value: function dispose() {
        return Promise.all([this.samplerDisposable.dispose(), this.sourceDisposable.dispose()]);
      }
    }]);

    return SampleDisposable;
  }();

  var SampleSource = function () {
    function SampleSource(f, sampler, stream) {
      _classCallCheck(this, SampleSource);

      this.source = stream.source;
      this.sampler = sampler.source;
      this.f = f;
    }

    _createClass(SampleSource, [{
      key: 'run',
      value: function run(sink, scheduler) {
        var sampleSink = new SampleSink(this.f, this.source, sink);
        var samplerDisposable = this.sampler.run(sampleSink, scheduler);
        var sourceDisposable = this.source.run(sampleSink.hold, scheduler);

        return new SampleDisposable(samplerDisposable, sourceDisposable);
      }
    }]);

    return SampleSource;
  }();

  var sample = (0, _prelude.curry3)(function (f, sampler, stream) {
    return new _most.Stream(new SampleSource(f, sampler, stream));
  });

  var arrayId = function arrayId() {
    for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
      values[_key] = arguments[_key];
    }

    return values;
  };

  var sampleArray = (0, _prelude.curry3)(function (f, sampler, arrayOfStreams) {
    return sample(f, sampler, (0, _most.combineArray)(arrayId, arrayOfStreams));
  });

  exports.sample = sample;
  exports.sampleArray = sampleArray;
});
