var EntityQuery = require("./entityQuery");

module.exports.entityQuery = EntityQuery;

var Dapi = function (options) {
  this.options = options;
};

Dapi.prototype.query = function (type) {
  return new EntityQuery(type);
};

module.exports = Dapi;
