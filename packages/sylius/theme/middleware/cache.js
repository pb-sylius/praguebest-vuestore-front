const Cache = require('stale-lru-cache');

exports.lruCache = new Cache({
  staleWhileRevalidate: 86400,
});
