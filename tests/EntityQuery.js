var assert = require("chai").assert;

var EntityQuery = require("../dist/EntityQuery");
var Sort = require("../dist/QueryOption/Sort");
var Condition = require("../dist/QueryOption/Condition");
var ConditionGroup = require("../dist/QueryOption/ConditionGroup");
var Exists = require("../dist/QueryOption/Exists");

describe("EntityQuery", function () {
  describe("#range()", function () {
    it("should set the start to 1 and the length to 2.", function () {
      var entityQuery = new EntityQuery();
      entityQuery.range(1, 2);
      assert.isTrue(entityQuery.hasRange);
      assert.equal(1, entityQuery.start);
      assert.equal(2, entityQuery.length);
    });

    it("should set the start to 1 and length to null.", function () {
      var entityQuery = new EntityQuery();
      entityQuery.range(1);
      assert.isTrue(entityQuery.hasRange);
      assert.equal(1, entityQuery.start);
      assert.isNull(entityQuery.length);
    });
  });

  describe("#sort()", function () {
    it("should create a new sort on the query object", function () {
      var entityQuery = new EntityQuery();
      entityQuery.sort("title");
      assert.instanceOf(entityQuery.children[0], Sort);
    });

    it("should create a new sort on the query object with the correct values", function () {
      var entityQuery = new EntityQuery();
      entityQuery.sort("title", "DESC", "en-US");
      assert.equal(entityQuery.children[0].field, "title");
      assert.equal(entityQuery.children[0].direction, "DESC");
      assert.equal(entityQuery.children[0].langcode, "en-US");
    });

    it("should create a new sort correct defaults", function () {
      var entityQuery = new EntityQuery();
      entityQuery.sort("title");
      assert.equal(entityQuery.children[0].field, "title");
      assert.equal(entityQuery.children[0].direction, "ASC");
      assert.equal(entityQuery.children[0].langcode, null);
    });

    it("should support adding multiple sorts", function () {
      var entityQuery = new EntityQuery();
      entityQuery.sort("title").sort("weight");
      assert.equal(entityQuery.children[0].field, "title");
      assert.equal(entityQuery.children[0].direction, "ASC");
      assert.equal(entityQuery.children[0].langcode, null);
      assert.equal(entityQuery.children[1].field, "weight");
      assert.equal(entityQuery.children[1].direction, "ASC");
      assert.equal(entityQuery.children[1].langcode, null);
    });
  });

  describe("#condition()", function () {
    it("should create a new condition on the query object", function () {
      var entityQuery = new EntityQuery();
      entityQuery.condition("title", "value");
      assert.instanceOf(entityQuery.children[0], Condition);
    });

    it("should create a new condition on the query object with the correct values", function () {
      var entityQuery = new EntityQuery();
      entityQuery.condition("title", "value", "=", "en-US");
      assert.equal(entityQuery.children[0].field, "title");
      assert.equal(entityQuery.children[0].value, "value");
      assert.equal(entityQuery.children[0].operator, "=");
      assert.equal(entityQuery.children[0].langcode, "en-US");
    });

    it("should create a new sort correct defaults", function () {
      var entityQuery = new EntityQuery();
      entityQuery.condition("title", "value");
      assert.equal(entityQuery.children[0].field, "title");
      assert.equal(entityQuery.children[0].value, "value");
      assert.equal(entityQuery.children[0].operator, "=");
      assert.equal(entityQuery.children[0].langcode, null);
    });

    it("should support adding multiple conditions", function () {
      var entityQuery = new EntityQuery();
      entityQuery.condition("field0", "value0").condition("field1", "value1");
      assert.equal(entityQuery.children[0].field, "field0");
      assert.equal(entityQuery.children[0].value, "value0");
      assert.equal(entityQuery.children[1].field, "field1");
      assert.equal(entityQuery.children[1].value, "value1");
    });
  });

  describe("#exists()", function () {
    it("should create a new exists condition on the query object", function () {
      var entityQuery = new EntityQuery();
      entityQuery.exists("title");
      assert.instanceOf(entityQuery.children[0], Exists);
    });

    it("should create a new exists condition on the query object with the correct values", function () {
      var entityQuery = new EntityQuery();
      entityQuery.exists("title", "en-US");
      assert.equal(entityQuery.children[0].field, "title");
      assert.equal(entityQuery.children[0].langcode, "en-US");
      assert.equal(entityQuery.children[0].condition, true);
    });

    it("should create a new exists condition with the correct defaults", function () {
      var entityQuery = new EntityQuery();
      entityQuery.exists("title");
      assert.equal(entityQuery.children[0].field, "title");
      assert.equal(entityQuery.children[0].langcode, null);
      assert.equal(entityQuery.children[0].condition, true);
    });

    it("should support adding multiple exists conditions", function () {
      var entityQuery = new EntityQuery();
      entityQuery.exists("field0").exists("field1");
      assert.equal(entityQuery.children[0].field, "field0");
      assert.equal(entityQuery.children[1].field, "field1");
    });
  });

  describe("#notExists()", function () {
    it("should create a new exists condition on the query object", function () {
      var entityQuery = new EntityQuery();
      entityQuery.notExists("title");
      assert.instanceOf(entityQuery.children[0], Exists);
    });

    it("should create a new exists condition on the query object with the correct values", function () {
      var entityQuery = new EntityQuery();
      entityQuery.notExists("title", "en-US");
      assert.equal(entityQuery.children[0].field, "title");
      assert.equal(entityQuery.children[0].langcode, "en-US");
      assert.isFalse(entityQuery.children[0].condition);
    });

    it("should create a new exists condition with the correct defaults", function () {
      var entityQuery = new EntityQuery();
      entityQuery.notExists("title");
      assert.equal(entityQuery.children[0].field, "title");
      assert.equal(entityQuery.children[0].langcode, null);
      assert.isFalse(entityQuery.children[0].condition);
    });

    it("should support adding multiple exists conditions", function () {
      var entityQuery = new EntityQuery();
      entityQuery.notExists("field0").notExists("field1");
      assert.equal(entityQuery.children[0].field, "field0");
      assert.equal(entityQuery.children[1].field, "field1");
    });
  });

  describe("#andConditionGroup()", function () {
    it("should create a new conditionGroup on the query object", function () {
      var entityQuery = new EntityQuery();
      entityQuery.andConditionGroup();
      assert.instanceOf(entityQuery.children[0], ConditionGroup);
    });

    it("should create a new conditionGroup on the query object with the proper conjunction", function () {
      var entityQuery = new EntityQuery();
      entityQuery.andConditionGroup();
      assert.equal(entityQuery.children[0].conjunction, "AND");
    });

    it("should support adding multiple conditionGroups", function () {
      var entityQuery = new EntityQuery();
      entityQuery.andConditionGroup();
      entityQuery.andConditionGroup();
      assert.instanceOf(entityQuery.children[0], ConditionGroup);
      assert.instanceOf(entityQuery.children[1], ConditionGroup);
    });
  });

  describe("#orConditionGroup()", function () {
    it("should create a new conditionGroup on the query object", function () {
      var entityQuery = new EntityQuery();
      entityQuery.orConditionGroup();
      assert.instanceOf(entityQuery.children[0], ConditionGroup);
    });

    it("should create a new conditionGroup on the query object with the proper conjunction", function () {
      var entityQuery = new EntityQuery();
      entityQuery.orConditionGroup();
      assert.equal(entityQuery.children[0].conjunction, "OR");
    });

    it("should support adding multiple conditionGroups", function () {
      var entityQuery = new EntityQuery();
      entityQuery.orConditionGroup();
      entityQuery.orConditionGroup();
      assert.instanceOf(entityQuery.children[0], ConditionGroup);
      assert.instanceOf(entityQuery.children[1], ConditionGroup);
    });
  });

  describe("#getQueryString", function () {
    //it("should return a query string", function () {
    //  var tests = [
    //    {
    //      expected: "?condition_0[field]=field0&condition_0[value]=value0&condition_0[operator]=NOTEQ&range[start]=0&range[length]=10]&sort_0[field]=field1&sort_0[direction]=DESC",
    //      actual: function () {
    //        var query = new EntityQuery();
    //        return query.condition("field0", "value0", "<>").range(0, 10).sort("field1", "DESC").getQueryString();
    //      }(),
    //    },
    //  ];

    //  tests.forEach(function (test) {
    //    assert.equal(test.actual, test.expected);
    //  });
    //});
  });

  describe("#compile", function () {
    var tests = [
      {
        title: "should compile a complex query",
        expected: [
          { key: "condition_0", name: "field", value: "field0" },
          { key: "condition_0", name: "value", value: "value0" },
          { key: "condition_0", name: "operator", value: "NOTEQ" },
          { key: "sort_0", name: "field", value: "field1" },
          { key: "sort_0", name: "direction", value: "DESC" },
          { key: "range", name: "start", value: 0 },
          { key: "range", name: "length", value: 10 },
        ],
        actual: function () {
          var query = new EntityQuery();
          return query.condition("field0", "value0", "<>").range(0, 10).sort("field1", "DESC").compile();
        }(),
      },
      {
        title: "should compile a query with a condition group",
        expected: [
          { key: "group_0", name: "conjunction", value: "OR" },
          { key: "condition_00", name: "field", value: "field0" },
          { key: "condition_00", name: "value", value: "value0" },
          { key: "condition_00", name: "operator", value: "EQ" },
          { key: "condition_00", name: "group", value: "group_0" },
          { key: "condition_01", name: "field", value: "field1" },
          { key: "condition_01", name: "value", value: "value1" },
          { key: "condition_01", name: "operator", value: "NOTEQ" },
          { key: "condition_01", name: "group", value: "group_0" },
        ],

        actual: function () {
          var query = new EntityQuery();
          query.orConditionGroup().condition("field0", "value0").condition("field1", "value1", "<>");
          return query.compile();
        }(),
      },
      {
        title: "should compile a query with a nested condition group",
        expected: [
          { key: "group_0", name: "conjunction", value: "OR" },
          { key: "group_00", name: "conjunction", value: "AND" },
          { key: "condition_000", name: "field", value: "field0" },
          { key: "condition_000", name: "value", value: "value0" },
          { key: "condition_000", name: "operator", value: "EQ" },
          { key: "condition_000", name: "group", value: "group_00" },
          { key: "group_00", name: "group", value: "group_0" },
        ],
        actual: function () {
          var query = new EntityQuery();
          query.orConditionGroup().andConditionGroup().condition("field0", "value0");
          return query.compile();
        }(),
      },
    ];

    tests.forEach(function (test) {
      it(test.title, function () {
        assert.deepEqual(test.actual, test.expected);
      });
    });
  });

});
