var mongoDb = require('../utils/mongo_dal').getDb();
var ObjectId = mongoDb.Schema.ObjectId;

var schema = new mongoDb.Schema({
  id: ObjectId,
  title: String,
  genre: String,
  year: String,
  actors: String
});

module.exports = mongoDb.model('Movie', schema);
