exports = function({ query, headers, body}, response) {

  const restoreDynamicDate = (obj) => {
    obj['timestamp'] = new Date(obj['timestamp']);
    return obj;
  }

  const result = context.services
    .get('mongodb-atlas')
    .db('data')
    .collection('scale')
    .insertOne(restoreDynamicDate(JSON.parse(body.text())));
  
  return result;
};
