exports = function({ query, headers, body}, response) {
  const result = context.services
    .get('mongodb-atlas')
    .db('data')
    .collection('scale')
    .insertOne(JSON.parse(body.text()));
  
  return result;
};
