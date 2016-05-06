var assert = require('chai').assert;

var EntityQuery = require('../src/entityQuery');
var Sort = require('../src/queryOption/sort');

describe('Sort', function () {

  describe('#attach()', function () {
    it('should correctly create parameters.', function () {
      var variations = [
        { field: "field0", direction: "ASC", langcode: "en-US" },
        { field: "field0", direction: "DESC", langcode: "en-US" },
        { field: "field0", direction: "ASC" },
        { field: "field0", direction: "DESC" },
        { field: "field0", langcode: "en-US" },
        { field: "field0" },
      ];

      var assert_variation = function (variation) {
        var query, sort, expected;

        query = [];
        sort = new Sort(
          variation.field,
          variation.direction,
          variation.langcode
        )
        sort.attach(0, query);

        expected = [
          { name: "field", value: variation.field, key: "sort_0" },
        ];

        if (variation.direction) {
          expected.push({
            name: "direction",
            value: variation.direction,
            key: "sort_0"
          })
        } else {
          expected.push({
            name: "direction",
            value: "ASC",
            key: "sort_0"
          })
        }

        if (variation.langcode) expected.push({
          name: "langcode",
          value: variation.langcode,
          key: "sort_0"
        });

        assert.deepEqual(
          query, expected
        );

      };

      variations.forEach(assert_variation);
    });
  });

});
