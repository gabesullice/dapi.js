var Sort = function (field, direction, langcode) {
  this.field = field;
  this.direction = direction ? direction : 'ASC';
  this.langcode = langcode ? langcode : null;
};

Sort.prototype.attach = function (id, query) {
  var parameters = [];

  parameters.push({ name: "field", value: this.field });
  parameters.push({ name: "direction", value: this.direction });

  if (this.langcode) {
    parameters.push({ name: "langcode", value: this.langcode });
  }

  Array.prototype.push.apply(query, parameters.map(function (parameter) {
    parameter.key = "sort_" + id;
    return parameter;
  }));
};

module.exports = Sort;
