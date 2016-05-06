var assert = require("chai").assert;

var EntityQuery = require("../dist/EntityQuery");
var Exists = require("../dist/QueryOption/Exists");

describe("Exists", function () {

  describe("#attach()", function () {
    it("should append all exists query parameters to a query.", function () {
      var exists = new Exists("title", "en-US", true);
      var query = [];
      exists.attach(0, query);
      assert.deepEqual(query[0], { name: "field", value: "title", key: "exists_0" });
      assert.deepEqual(query[1], { name: "condition", value: "TRUE", key: "exists_0" });
      assert.deepEqual(query[2], { name: "langcode", value: "en-US", key: "exists_0" });
    });

    it("should append all exists query parameters to a query without a default langcode.", function () {
      var exists = new Exists("title", null, true);
      var query = [];
      exists.attach(0, query);
      query.forEach(function (parameter) {
        assert.propertyNotVal(parameter, "name", "langcode");
      });
    });

    it("should propertly default to exists instead of notExists.", function () {
      var exists = new Exists("title");
      assert.isTrue(exists.condition);
    });

    it("should propertly initialize a notExists.", function () {
      var exists;

      exists = new Exists("title", null, false);
      assert.isFalse(exists.condition);

      exists = new Exists("title", "en-us", false);
      assert.isFalse(exists.condition);
    });
  });

});
