exports = function({ query, headers, body}, response) {
  let parsedBody = JSON.parse(body.text());
  parsedBody['timestamp'] = Date.parse(parsedBody['timestamp']);
  
  const result = context.services
    .get('mongodb-atlas')
    .db('data')
    .collection('scale')
    .insertOne(parsedBody);
  
  return result;
};
