# Dapi.js

The JavaScript Drupal API toolkit

## Components

- [Entity Query API Binding](#entity-query-api-binding)

## Entity Query API Binding

The Entity Query API binding is a javascript library for creating entity query query strings. The interface tries to mimic the Drupal QueryInterface with few exceptions. It is meant to be used in tandem with the [Entity Query API](https://www.drupal.org/project/entityqueryapi) module.

## Building

If you want to use `dapi.js` in a browser environment,

```
npm i
```

```
npm run build
```

## Example
```javascript
var EntityQuery = require('drupal-api').entityQuery;

var query = new EntityQuery('node');
query
  .condition('field_color', 'red', 'CONTAINS')
  .orConditionGroup()
    .condition('field_color', 'blue', 'CONTAINS')
    .condition('field_color', 'green', 'CONTAINS');
query.sort('created', 'DESC');

queryString = query.getQueryString();
/*
  condition_0[field]=field_color&condition_0[value]=red&condition_0[operator]=CONTAINS \
  &group_0[conjunction]=OR \
  &condition_00[field]=field_color&condition_00[value]=blue&condition_00[operator]=CONTAINS&condition_00[group]=group_0 \
  &condition_01[field]=field_color&condition_01[value]=green&condition_01[operator]=CONTAINS&condition_01[group]=group_0 \
  &sort_0[field]=created&sort_0[direction]=DESC
*/
```
