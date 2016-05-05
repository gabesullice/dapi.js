var Condition = require("./Condition.js");

var ConditionGroup = function (conjunction, group) {
  this.conjunction = conjunction ? conjunction : "AND";
  if (group) this.group = group;

  this.children = [];
};

ConditionGroup.prototype.attach = function (id, query) {
  var parameters = [];

  parameters.push({ name: "conjunction", value: this.conjunction });

  if (this.group) {
    parameters.push({ name: "group", value: this.group });
  }

  Array.prototype.push.apply(query, parameters.map(function (parameter) {
    parameter.key = "group_" + id;
    return parameter;
  }));
};

ConditionGroup.prototype.condition = function (field, value, operator, langcode) {
  this.children.push(new Condition(field, value, operator, langcode));
  return this;
};

ConditionGroup.prototype.andConditionGroup = function () {
  this.children.push(new ConditionGroup("AND"));
  return this;
};

ConditionGroup.prototype.orConditionGroup = function () {
  this.children.push(new ConditionGroup("OR"));
  return this;
};

module.exports = ConditionGroup;
