var Exists = function (field, langcode, condition) {
  this.type = "exists";
  this.field = field;
  this.langcode = langcode ? langcode : null;
  this.condition = (condition == undefined) ? true : condition;
};

Exists.prototype.attach = function (id, query) {
  var parameters = [];
  var conditionValue = this.condition ? "TRUE" : "FALSE";

  parameters.push({ name: "field", value: this.field });
  parameters.push({ name: "condition", value: conditionValue });

  if (this.langcode) {
    parameters.push({ name: "langcode", value: this.langcode });
  }

  Array.prototype.push.apply(query, parameters.map(function (parameter) {
    parameter.key = this.type + "_" + id;
    return parameter;
  }, this));
};

module.exports = Exists;
