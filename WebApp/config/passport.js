var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function() {
    var User = mongoose.model('User');

    passport.serializeUser(function(user, done){
       done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findOne({
            _id : id
        }, '-password -salt', function(err, user){
          // 몽구스가 password, salt속성을 가져오지 않도록 필드 옵션 사용
            done(err, user);
        });
    });
    require('./strategies/local.js')();
    // 지역전략 구성config파일 포함
};
