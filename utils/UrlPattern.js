var UrlPattern = require('url-pattern');

module.exports = new UrlPattern(
  // /^\/([^\/]+)(?:\/(\d+))?$/,
  /^\/([^\/]+)(?:\/([^\/]+))?(?:\/([^\/]+))?(?:\/([^\/]+))?$/,
  ['resource', 'id', 'relation', 'relationId']
);

// console.log(pattern.match('/users'));
// console.log(pattern.match('/users/5'));
// console.log(pattern.match('/users/foo'));
// console.log(pattern.match('/users/23/dogs'));
// console.log(pattern.match('/users/23/dogs/50'));

