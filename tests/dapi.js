var assert = require("chai").assert;

var Dapi = require("../src/dapi");
var EntityQuery = require("../src/entityQuery");

describe("Dapi", function () {
  describe("#query()", function () {
    it("should return a new EntityQuery for the given entity type", function () {
      var dapi = new Dapi();
      assert.instanceOf(dapi.query('node'), EntityQuery);
    });
  });
});
