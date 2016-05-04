var Exists = function (field, langcode, condition) {
  this.field = field;
  this.langcode = langcode ? langcode : null;
  this.condition = (typeof condition === undefined) ? true : condition;
};

module.exports = Exists;
