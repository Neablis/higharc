"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateQuery = exports.opMap = void 0;

var _typeorm = require("typeorm");

const opMap = {
  eq: _typeorm.Equal,
  in: _typeorm.In,
  ne: _typeorm.Not
};
exports.opMap = opMap;

const generateQuery = filter => {
  if (!filter) return {};
  const query = {};
  Object.keys(filter).forEach(key => {
    const [field, op] = key.split('_');
    query[field] = opMap[op](filter[key]);
  });
  return query;
};

exports.generateQuery = generateQuery;
//# sourceMappingURL=graphql.js.map