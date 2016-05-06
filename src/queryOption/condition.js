var Condition = function (field, value, operator, langcode) {
  this.type = "condition";
  this.field = field;
  this.value = value;
  this.operator = operator ? operator : "=";
  this.langcode = langcode ? langcode : null;
};

Condition.prototype.mapOperator = function (op) {
  dict = {
    "=":  "EQ",
    "<>": "NOTEQ",
    ">":  "GT",
    ">=": "GTEQ",
    "<":  "LT",
    "<=": "LTEQ"
  };

  if (op in dict) {
    return dict[op];
  } else {
    return op;
  }
};

Condition.prototype.attach = function (id, query) {
  var parameters = [];

  parameters.push({ name: "field", value: this.field });
  parameters.push({ name: "value", value: this.value });
  parameters.push({ name: "operator", value: this.mapOperator(this.operator) });

  if (this.langcode) {
    parameters.push({ name: "langcode", value: this.langcode });
  }

  Array.prototype.push.apply(query, parameters.map(function (parameter) {
    parameter.key = "condition_" + id;
    return parameter;
  }));
};

module.exports = Condition;
