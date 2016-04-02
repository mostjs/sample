# @most/sample

Create a new stream by combining sampled values from many input streams.

## Install

`npm install @most/sample`

## API

#### sample :: (a → b → c) → Stream a → Stream b → Stream c

```
stream:                          -[1]---[2]---[3]---[4]---->
sampler:                         -[a]---[a]---[a]---[a]---->
sample(concat, sampler, stream): -[1,a]-[2,a]-[3,a]-[4,a]-->
```
`sample` produces a value only when an event arrives on the sampler,
passing an the value of the `sampler` along with the latest value from
`stream`.

`sample` is curried by default.

```js
import {periodic, of} from 'most';
import {sample} from '@most/sample';

const add = (x, y) => x + y;

const sampleWithArray = sample(Array);
const sampleEachSecond = sampleWithArray(periodic(1000, 1).scan(add, 0));

sampleEachSecond(of(2))
  .take(3)
  .observe(([sec, val]) => {
    console.log('Seconds Passed: ' + sec);
    console.log(sec * value);
  });
// Seconds Passed: 0
// 0
// Seconds Passed: 1
// 2
// Seconds Passed: 2
// 4

```

#### sampleArray :: (a → [b] → c) → Stream a → [Stream b] → Stream c

```
s1:                            -[1]---[2]---[3]---[4]---->
sampler:                       -[a]---[a]---[a]---[a]---->
sample(concat, sampler, [s1]): -[1,a]-[2,a]-[3,a]-[4,a]-->
```
`sampleArray` produces a value only when an event arrives on the sampler,
passing an the value of the `sampler` along with an array of latest values from
streams contained in `arrayOfStreams`.

`sampleArray` is curried by default.

```js
import {periodic, of} from 'most';
import {sampleArray} from '@most/sample';

const add = (x, y) => x + y;

const sampleWithArray = sampleArray(Array);
const sampleEachSecond = sampleWithArray(periodic(1000, 1).scan(add, 0));

sampleEachSecond([of(1), of(2)])
  .take(3)
  .observe(([sec, [s1, s2]]) => {
    console.log('Seconds Passed: ' + sec);
    console.log(s1 * sec, s2 * sec);
  });
// Seconds Passed: 0
// 0, 0
// Seconds Passed: 1
// 1, 2
// Seconds Passed: 2
// 2, 4

```
