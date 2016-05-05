var Exists = function (field, langcode, condition) {
  this.field = field;
  this.langcode = langcode ? langcode : null;
  this.condition = (typeof condition === undefined) ? true : condition;
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
    parameter.key = "exists_" + id;
    return parameter;
  }));
};

module.exports = Exists;
