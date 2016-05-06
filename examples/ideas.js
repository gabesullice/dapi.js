var dapi = dapi.connect({options});
dapi.addAdapter(something);

var query = dapi.query('assessment').condition(...);
var results = dapi.get(query);

var firstNames = results.map(function (assessment) {
  return dapi.pluck("firstName", assessment);
});

var node = dapi.get('node', 1254);

var endpoint = dapi.getURL('node', 1254);
var endpoint = dapi.getURL(query);

var endpoint = dapi.getVanity("/custom/route", {queryOptions});
