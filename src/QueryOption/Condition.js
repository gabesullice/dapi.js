var Condition = function (field, value, operator, langcode) {
  this.field = field;
  this.value = value;
  this.operator = operator ? operator : "=";
  this.langcode = langcode ? langcode : null;
};

module.exports = Condition;
