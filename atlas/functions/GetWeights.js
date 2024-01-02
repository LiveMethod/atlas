exports = function({ query, headers, body}, response) {
  const docs = context.services
    .get('mongodb-atlas')
    .db('data')
    .collection('scale')
    .find({})
    .toArray();
    
    return docs;
};
