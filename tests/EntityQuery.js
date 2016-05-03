var assert = require('chai').assert;

var EntityQuery = require('../dist/EntityQuery');

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
});
