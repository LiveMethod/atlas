exports = function({ query, headers, body}, response) {

  const restoreDynamicDate = (obj) => {
    console.log(JSON.stringify(obj, null, 2));
    obj['timestamp'] = Date.parse(obj['obj']);
    console.log(JSON.stringify(obj, null, 2));
    return obj;
  }

  const result = context.services
    .get('mongodb-atlas')
    .db('data')
    .collection('scale')
    .insertOne(restoreDynamicDate(JSON.parse(body.text())));
  
  return result;
};
