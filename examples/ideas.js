var dapi = dapi.connect({options});
dapi.addAdapter(something);
var query = dapi.query('assessment').condition(...);
var firstNames = dapi.get(query).map(function (assessment) {
  return dapi.pluck("firstName");
});

var node = dapi.get('node', 1254);

var endpoint = dapi.getURL('node', 1254);
var endpoint = dapi.getURL(query);

var endpoint = dapi.getVanity("/custom/route", {queryOptions});
