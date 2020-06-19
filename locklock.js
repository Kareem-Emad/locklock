const { promisify } = require('util');

/**
 * @function {acquireLock}
 * @summary check and acquire lock if avaiable
 * @param redisClient client for redis
 * @param lockString the key you want to use as lock on redis
 * @returns {Boolean} whether the lock was acquired or found that someone else acquired it already
 */
const acquireLock = async function(redisClient, lockString) {
  if (typeof (lockString) !== 'string' || lockString.length === 0) {
    throw new Error('lockString is malformed');
  }
  if (!redisClient.setnx) {
    throw new Error('redisClient does not have the required commands supported(setnx)');
  }
  const setnx = promisify(redisClient.setnx).bind(redisClient);
  const res = await setnx(lockString, 'locked');
  return res;
};

/**
 * @function {releaseLock}
 * @summary unlock a redis key
 * @param redisClient client for redis
 * @param lockString the key you want to use as lock on redis
 * @returns {Boolean} status of the unlock operation
 */
const releaseLock = async function(redisClient, lockString) {
  if (typeof (lockString) !== 'string' || lockString.length === 0) {
    throw new Error('lockString is malformed');
  }
  if (!redisClient.del) {
    throw new Error('redisClient does not have the required commands supported(setnx)');
  }
  const del = promisify(redisClient.del).bind(redisClient);
  const res = await del(lockString);
  return res;
};

module.exports = {
  acquireLock,
  releaseLock,
};
