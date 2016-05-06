var assert = require("chai").assert;

var EntityQuery = require("../dist/EntityQuery");
var ConditionGroup = require("../dist/QueryOption/ConditionGroup");
var Condition = require("../dist/QueryOption/Condition");
var Exists = require("../dist/QueryOption/Exists");

describe("ConditionGroup", function () {

  describe("#attach()", function () {
    it("should correctly create parameters.", function () {
      var variations = [
        { conjunction: "AND", group: "group_0" },
        { conjunction: "OR", group: "group_0" },
        { conjunction: "AND" },
        { conjunction: "OR" },
        { group: "group_0" },
        { },
      ];

      var assert_variation = function (variation) {
        var query, group, expected;

        query = [];
        group = new ConditionGroup(variation.conjunction, variation.group);
        group.attach(1, query);

        expected = [];

        if (variation.conjunction) {
          expected.push({ name: "conjunction", value: variation.conjunction, key: "group_1" });
        } else {
          expected.push({ name: "conjunction", value: "AND", key: "group_1" });
        }

        if (variation.group) {
          expected.push({ name: "group", value: variation.group, key: "group_1" });
        }

        assert.deepEqual(query, expected);
      };

      variations.forEach(assert_variation);
    });

    it("should correctly create child parameters", function () {
      var tests = [
        {
          actual: function () {
            var group, query = [];
            group = new ConditionGroup().condition("field0", "value0").attach(0, query);
            return query;
          }(),
          expected: [
            { name: "conjunction", value: "AND", key: "group_0" },
            { name: "field", value: "field0", key: "condition_00" },
            { name: "value", value: "value0", key: "condition_00" },
            { name: "operator", value: "EQ", key: "condition_00" },
            { name: "group", value: "group_0", key: "condition_00" },
          ],
        },
        {
          actual: function () {
            var group, query = [];
            group = new ConditionGroup();
            group.andConditionGroup()
            group.attach(1, query);
            return query;
          }(),
          expected: [
            { name: "conjunction", value: "AND", key: "group_1" },
            { name: "conjunction", value: "AND", key: "group_10" },
            { name: "group", value: "group_1", key: "group_10" },
          ],
        },
        {
          actual: function () {
            var group, query = [];
            group = new ConditionGroup().condition("field1", "value1");
            group.andConditionGroup();
            group.attach(2, query);
            return query;
          }(),
          expected: [
            { name: "conjunction", value: "AND", key: "group_2" },
            { name: "field", value: "field1", key: "condition_20" },
            { name: "value", value: "value1", key: "condition_20" },
            { name: "operator", value: "EQ", key: "condition_20" },
            { name: "group", value: "group_2", key: "condition_20" },
            { name: "conjunction", value: "AND", key: "group_21" },
            { name: "group", value: "group_2", key: "group_21" },
          ],
        },
      ];

      tests.forEach(function (test) {
        assert.deepEqual(test.actual, test.expected);
      });
    });
  });

  describe("#condition", function () {
    it("should accept conditions", function () {
      var group = new ConditionGroup().condition("field0", "value0");
      assert.deepEqual(group.children, [ new Condition("field0", "value0"), ]);
    });
  });

  describe("#andConditionGroup", function () {
    it("should create child andConditionGroups", function () {
      var group = new ConditionGroup();
      group.andConditionGroup();
      assert.deepEqual(group.children, [ new ConditionGroup("AND"), ]);
    });
  });

  describe("#orConditionGroup", function () {
    it("should create child orConditionGroups", function () {
      var group = new ConditionGroup();
      group.orConditionGroup();
      assert.deepEqual(group.children, [ new ConditionGroup("OR"), ]);
    });
  });

  describe("#exists", function () {
    it("should create child exists", function () {
      var group = new ConditionGroup().exists("field0");
      assert.deepEqual(group.children, [ new Exists("field0") ]);
    });
  });

  describe("#notExists", function () {
    it("should create child notExists", function () {
      var group = new ConditionGroup().notExists("field0");
      assert.deepEqual(group.children, [ new Exists("field0", null, false) ]);
    });
  });

});
