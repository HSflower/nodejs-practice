var config = require('./config'),
     mongoose = require('mongoose');

module.exports = function() {
   var db = mongoose.createConnection(config.db);

   require('../app/models/user.server.model.js');
   // mongoose로 정의한 모델 적용
   // CRUD작업은 Users컨트롤러를 만들어서 사용한다.
   require('../app/models/article.server.model.js');
   return db;
}
