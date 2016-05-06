var Sort = require("./QueryOption/Sort");
var Condition = require("./QueryOption/Condition");
var ConditionGroup = require("./QueryOption/ConditionGroup");
var Exists = require("./QueryOption/Exists");

var EntityQuery = function () {
  this.children = [];

  this.count = false;

  this.hasRange = false;
  this.start = null;
  this.length = null;
};

EntityQuery.prototype.range = function (start, length) {
  this.hasRange = true;
  this.start = start;
  this.length = length || this.length;
  return this;
};

EntityQuery.prototype.condition = function (field, value, operator, langcode) {
  this.children.push(new Condition(field, value, operator, langcode));
  return this;
};

EntityQuery.prototype.sort = function (field, direction, langcode) {
  this.children.push(new Sort(field, direction, langcode));
  return this;
};

EntityQuery.prototype.exists = function (field, langcode) {
  this.children.push(new Exists(field, langcode, true));
  return this;
};

EntityQuery.prototype.notExists = function (field, langcode) {
  this.children.push(new Exists(field, langcode, false));
  return this;
};

EntityQuery.prototype.andConditionGroup = function () {
  var len = this.children.push(new ConditionGroup("AND"));
  return this.children[len - 1];
};

EntityQuery.prototype.orConditionGroup = function () {
  var len = this.children.push(new ConditionGroup("OR"));
  return this.children[len - 1];
};

EntityQuery.prototype.getQueryString = function () {
  return "";
};

EntityQuery.prototype.compile = function () {
  var counter = {}, parameters = [];

  this.children.forEach(function (child) {
    child_id = counter[child.type] || 0;
    child.attach(child_id, parameters);
    counter[child.type] = child_id + 1;
  });

  if (this.hasRange) {
    parameters.push({ key: "range", name: "start", value: this.start });
    if (this.length) {
      parameters.push({ key: "range", name: "length", value: this.length });
    }
  }

  return parameters;
};

module.exports = EntityQuery;
