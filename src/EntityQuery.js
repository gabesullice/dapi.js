var Sort = require("./QueryOption/Sort");
var Condition = require("./QueryOption/Condition");
var ConditionGroup = require("./QueryOption/ConditionGroup");
var Exists = require("./QueryOption/Exists");

var EntityQuery = function () {
  this.conditions = [];
  this.existsOptions = [];
  this.conditionGroups = [];
  this.sorts = [];

  this.count = false;

  this.rangeOptions = {
    start: null,
    length: null
  };
};

EntityQuery.prototype.range = function (start, length) {
  this.rangeOptions.start = start;
  this.rangeOptions.length = length;
  return this;
};

EntityQuery.prototype.condition = function (field, value, operator, langcode) {
  this.conditions.push(new Condition(field, value, operator, langcode));
  return this;
};

EntityQuery.prototype.sort = function (field, direction, langcode) {
  this.sorts.push(new Sort(field, direction, langcode));
  return this;
};

EntityQuery.prototype.exists = function (field, langcode) {
  this.existsOptions.push(new Exists(field, langcode, true));
  return this;
};

EntityQuery.prototype.notExists = function (field, langcode) {
  this.existsOptions.push(new Exists(field, langcode, false));
  return this;
};

EntityQuery.prototype.andConditionGroup = function () {
  this.conditionGroups.push(new ConditionGroup("AND"));
  return this;
};

EntityQuery.prototype.orConditionGroup = function () {
  this.conditionGroups.push(new ConditionGroup("OR"));
  return this;
};

module.exports = EntityQuery;
