exports = function({ query, headers, body}, response) {
  let parsedBody = JSON.parse(body.text());
  console.log(parsedBody);
  parsedBody['timestamp'] = Date.parse(parsedBody['timestamp']);
  
  console.log(parsedBody);

  const result = context.services
    .get('mongodb-atlas')
    .db('data')
    .collection('scale')
    .insertOne(parsedBody);
  
  return parsedBody;
};
