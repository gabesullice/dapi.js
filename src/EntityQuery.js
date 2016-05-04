//var ConditionGroup = require('./QueryOption/ConditionGroup');
//var Condition = require('./QueryOption/Condition');
//var Exist = require('./QueryOption/Exist');
var Sort = require('./QueryOption/Sort');
var Condition = require('./QueryOption/Condition');

var EntityQuery = function () {
  this.conditions = [];
  this.exists = [];
  this.groups = [];
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

//EntityQuery.prototype.condition = function () {
//  this.conditions.appendChild(this.getQueryOption(Condition, arguments));
//  return this;
//};

//EntityQuery.prototype.andConditionGroup = function () {
//  this.conditionGroup.apply('AND', arguments);
//  return this;
//};
//
//EntityQuery.prototype.orConditionGroup = function () {
//  this.conditionGroup.apply('OR', arguments);
//  return this;
//};
//
//EntityQuery.prototype.conditionGroup = function () {
//  this.groups.appendChild(this.getQueryOption.apply(ConditionGroup, arguments));
//  return this;
//};
//
//
//EntityQuery.prototype.sort = function () {
//};
//
//EntityQuery.prototype.count = function () {
//};
//
//EntityQuery.prototype.exists = function () {
//};
//EntityQuery.prototype.notExists = function () {
//};

module.exports = EntityQuery;
