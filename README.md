# ⚠️ Deprecated ⚠️
 
`@most/sample` is deprecated.

Support and maintenance will cease when `@most/core` 1.0 is released. Meanwhile, only critical bug fixes will be released. 

Its functionality is currently available in [@most/core](http://mostcore.readthedocs.io/en/latest/api.html#sample) and will also be available in most 2.0.

# @most/sample
 
Create a new stream by combining sampled values from many input streams.

## Install

`npm install @most/sample`

## API

#### sample :: (a → b → c) → Stream a → Stream b → Stream c

```
stream:                          -2--3-4--2--5--6---7---1->
sampler:                         ---1----2----3-------5--->
sample(sum, sampler, stream):    ---3----6----8-------12-->
```
`sample` produces a value only when an event arrives on the sampler,
passing the value of the `sampler` along with the latest value from
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
s1:                             -2--3-4--2--5--6---7---1->
s2:                             -1--2---3----------4----->
sampler:                        ---1----2----3-------5--->
sample(sum, sampler, [s1, s2]): ---4----9----11-------16-->
```
`sampleArray` produces a value only when an event arrives on the sampler,
passing the value of the `sampler` along with an array of latest values from
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
