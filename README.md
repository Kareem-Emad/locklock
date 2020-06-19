# locklock

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status:](https://github.com/Kareem-Emad//locklock/workflows/Node/badge.svg)](https://github.com/Kareem-Emad/locklock/actions)
![npm](https://img.shields.io/npm/v/locklock-redis)

A simple global locking/unlocking mechanism using redis

## how to install

```shell
npm i locklock-redis
```

## how to use

- The interface contains two main functions `acquireLock`, `releaseLock`.
- to use locking you need to have an intialized redis client and choose a string to be used for locking on redis
- to try and acquire the lock on certain key:

```js
const res = await locklock.acquireLock(client, testString);// will return 1 if lock is acquired successfully
// will return 0 if already locked by someone else
```

- to unlock a key after you are done executing critical section:

```js
let res = await locklock.releaseLock(client, testString);// will return true asserting that your unlock process is successfull
```
