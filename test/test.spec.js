const assert = require('assert');
const { describe, it} = require('mocha');
const locklock = require('../locklock');
const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();
const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);
const del = promisify(client.del).bind(client);

const testString = 'test2000';


describe('basic Lock/unlock Scenario', () => {

  it('should be able to lock free keys', async() => {
    const res = await locklock.acquireLock(client, testString);
    assert.equal(res, 1);
    const keyValue = await get(testString);
    assert.equal(keyValue, 'locked');
    await del(testString);
  });

  it('should be able to unlock key and lock it myself', async() => {
    await set(testString, 'locked');
    let res = await locklock.releaseLock(client, testString);
    assert.equal(res, true);

    res = await locklock.acquireLock(client, testString);
    assert.equal(res, 1);
    await del(testString);
  });

  it('should not be able to lock a locked key', async() => {
    let res = await locklock.acquireLock(client, testString);
    assert.equal(res, 1);
    res = await locklock.acquireLock(client, testString);
    assert.equal(res, 0);
    await del(testString);
  });
});
