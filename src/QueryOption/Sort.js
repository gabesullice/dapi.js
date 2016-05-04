var Sort = function (field, direction, langcode) {
  this.field = field;
  this.direction = direction ? direction : 'ASC';
  this.langcode = langcode ? langcode : null;
};

module.exports = Sort;
