var Condition = require("./condition.js");
var Exists = require("./exists.js");

var ConditionGroup = function (conjunction, group) {
  this.type = "group";
  this.conjunction = conjunction ? conjunction : "AND";
  if (group) this.group = group;

  this.children = [];
};

ConditionGroup.prototype.attach = function (id, query) {
  var parameters = [];

  parameters.push({ name: "conjunction", value: this.conjunction });

  if (this.group) {
    parameters.push({ name: this.type, value: this.group });
  }

  Array.prototype.push.apply(query, parameters.map(function (parameter) {
    parameter.key = this.type + "_" + id;
    return parameter;
  }, this));

  this.children.forEach(function (child, n) {
    var child_id = "" + id + n;
    child.attach(child_id, query);
    query.push({ name: "group", value: "group_" + id, key: child.type + "_" + child_id });
  });
};

ConditionGroup.prototype.condition = function (field, value, operator, langcode) {
  this.children.push(new Condition(field, value, operator, langcode));
  return this;
};

ConditionGroup.prototype.exists = function (field, langcode) {
  this.children.push(new Exists(field, langcode, true));
  return this;
};

ConditionGroup.prototype.notExists = function (field, langcode) {
  this.children.push(new Exists(field, langcode, false));
  return this;
};

ConditionGroup.prototype.andConditionGroup = function () {
  var len = this.children.push(new ConditionGroup("AND"));
  return this.children[len - 1];
};

ConditionGroup.prototype.orConditionGroup = function () {
  var len = this.children.push(new ConditionGroup("OR"));
  return this.children[len - 1];
};

module.exports = ConditionGroup;
