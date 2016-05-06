var assert = require("chai").assert;

var EntityQuery = require("../dist/EntityQuery");
var Condition = require("../dist/QueryOption/Condition");

describe("Condition", function () {

  describe("#attach()", function () {
    it("should correctly create parameters.", function () {
      var variations = [
        { field: "field0", value: "value0", operator: "=", langcode: "en-US" },
        { field: "field0", value: "value0", operator: "<>", langcode: "en-US" },
        { field: "field0", value: "value0", operator: ">", langcode: "en-US" },
        { field: "field0", value: "value0", operator: ">=", langcode: "en-US" },
        { field: "field0", value: "value0", operator: "<", langcode: "en-US" },
        { field: "field0", value: "value0", operator: "<=", langcode: "en-US" },
        { field: "field0", value: "value0", operator: "STARTS_WITH", langcode: "en-US" },
        { field: "field0", value: "value0", operator: "CONTAINS", langcode: "en-US" },
        { field: "field0", value: "value0", operator: "ENDS_WITH", langcode: "en-US" },
        { field: "field0", value: "value0", langcode: "en-US" },
        { field: "field0", value: "value0", operator: "=" },
        { field: "field0", value: "value0" }
      ];

      var assert_variation = function (variation) {
        var query, condition, expected;

        query = [];
        condition = new Condition(
          variation.field,
          variation.value,
          variation.operator,
          variation.langcode
        )
        condition.attach(0, query);

        expected = [
          { name: "field", value: variation.field, key: "condition_0" },
          { name: "value", value: variation.value, key: "condition_0" }
        ];

        if (variation.operator) {
          expected.push({
            name: "operator",
            value: Condition.prototype.mapOperator(variation.operator),
            key: "condition_0"
          })
        } else {
          expected.push({
            name: "operator",
            value: "EQ",
            key: "condition_0"
          })
        }

        if (variation.langcode) expected.push({
          name: "langcode",
          value: variation.langcode,
          key: "condition_0"
        });

        assert.deepEqual(
          query, expected
        );

      };

      variations.forEach(assert_variation);
    });
  });

  describe("#mapOperator()", function () {
    it("should correctly map all non-alpha operators to alpha operators", function () {
      var mappings = [ 
        { input: "=",  expect: "EQ",},
        { input: "<>", expect: "NOTEQ",},
        { input: ">",  expect: "GT",},
        { input: ">=", expect: "GTEQ",},
        { input: "<",  expect: "LT",},
        { input: "<=", expect: "LTEQ"}
      ];

      mappings.forEach(function (mapping) {
        assert.equal(Condition.prototype.mapOperator(mapping.input), mapping.expect);
      });
    });
  });

});
