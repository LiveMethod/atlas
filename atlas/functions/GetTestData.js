exports = function({ query, headers, body}, response) {
  const docs = context.services
    .get('mongodb-atlas')
    .db('sandbox')
    .collection('test')
    .find({})
    .toArray();
    
    return docs;
};
