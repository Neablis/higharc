import { Equal, In, Not } from 'typeorm';

export const opMap = { eq: Equal, in: In, ne: Not };

export const generateQuery = (filter) => {
    if (!filter) return {};
    const query = {};
    Object.keys(filter).forEach((key) => {
      const [field, op] = key.split('_');
      query[field] = opMap[op](filter[key]);
    });
    return query;
};