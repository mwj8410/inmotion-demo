var mongoose = require('mongoose');

mongoose.connect(global.config.mongo_connection_str);

module.exports = {
  getDb() {
    return mongoose;
  }
};
