var assert = require('chai').assert;

var EntityQuery = require('../dist/EntityQuery');
var Sort = require('../dist/QueryOption/Sort');
var Condition = require('../dist/QueryOption/Condition');

describe('EntityQuery', function () {
  describe('#range()', function () {
    it('should set the start to 1 and the length to 2.', function () {
      var entityQuery = new EntityQuery();
      entityQuery.range(1, 2);
      assert.equal(1, entityQuery.rangeOptions.start);
      assert.equal(2, entityQuery.rangeOptions.length);
    });

    it('should set the start to 1 and length to null.', function () {
      var entityQuery = new EntityQuery();
      entityQuery.range(1);
      assert.equal(1, entityQuery.rangeOptions.start);
      assert.equal(null, entityQuery.rangeOptions.length);
    });
  });

  describe('#sort()', function () {
    it('should create a new sort on the query object', function () {
      var entityQuery = new EntityQuery();
      entityQuery.sort('title');
      assert.instanceOf(entityQuery.sorts[0], Sort);
    });

    it('should create a new sort on the query object with the correct values', function () {
      var entityQuery = new EntityQuery();
      entityQuery.sort("title", "DESC", "en-US");
      assert.equal(entityQuery.sorts[0].field, "title");
      assert.equal(entityQuery.sorts[0].direction, "DESC");
      assert.equal(entityQuery.sorts[0].langcode, "en-US");
    });

    it('should create a new sort correct defaults', function () {
      var entityQuery = new EntityQuery();
      entityQuery.sort("title");
      assert.equal(entityQuery.sorts[0].field, "title");
      assert.equal(entityQuery.sorts[0].direction, "ASC");
      assert.equal(entityQuery.sorts[0].langcode, null);
    });

    it('should support adding multiple sorts', function () {
      var entityQuery = new EntityQuery();
      entityQuery.sort("title").sort("weight");
      assert.equal(entityQuery.sorts[0].field, "title");
      assert.equal(entityQuery.sorts[0].direction, "ASC");
      assert.equal(entityQuery.sorts[0].langcode, null);
      assert.equal(entityQuery.sorts[1].field, "weight");
      assert.equal(entityQuery.sorts[1].direction, "ASC");
      assert.equal(entityQuery.sorts[1].langcode, null);
    });
  });

  describe('#condition()', function () {
    it('should create a new condition on the query object', function () {
      var entityQuery = new EntityQuery();
      entityQuery.condition('title', 'value');
      assert.instanceOf(entityQuery.conditions[0], Condition);
    });

    it('should create a new condition on the query object with the correct values', function () {
      var entityQuery = new EntityQuery();
      entityQuery.condition("title", "value", "=", "en-US");
      assert.equal(entityQuery.conditions[0].field, "title");
      assert.equal(entityQuery.conditions[0].value, "value");
      assert.equal(entityQuery.conditions[0].operator, "=");
      assert.equal(entityQuery.conditions[0].langcode, "en-US");
    });

    it('should create a new sort correct defaults', function () {
      var entityQuery = new EntityQuery();
      entityQuery.condition("title", "value");
      assert.equal(entityQuery.conditions[0].field, "title");
      assert.equal(entityQuery.conditions[0].value, "value");
      assert.equal(entityQuery.conditions[0].operator, "=");
      assert.equal(entityQuery.conditions[0].langcode, null);
    });

    it('should support adding multiple conditions', function () {
      var entityQuery = new EntityQuery();
      entityQuery.condition("field0", "value0").condition("field1", "value1");
      assert.equal(entityQuery.conditions[0].field, "field0");
      assert.equal(entityQuery.conditions[0].value, "value0");
      assert.equal(entityQuery.conditions[1].field, "field1");
      assert.equal(entityQuery.conditions[1].value, "value1");
    });
  });
});
