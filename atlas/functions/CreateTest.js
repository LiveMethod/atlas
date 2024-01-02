exports = function({ query, headers, body}, response) {
  const result = context.services
    .get('mongodb-atlas')
    .db('sandbox')
    .collection('test')
    .insertOne(JSON.parse(body.text()));
  
  return result;
};
