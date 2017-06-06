var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');
// passport모듈, strategy객체(passport-local), 인증할 몽구스 모델
//  require로 등록

module.exports = function() {
    // passport.use()로 LocalStrategy객체 등록
    // LocalStrategy()의 인수 = 콜백함수(username, pw, done을 인수로 내용 수행)
    passport.use(new LocalStrategy(function(username, password , done) {
        User.findOne({
            userid : username
        }, function(err, user){
            if(err) {
                return done(err);
            }
            // userId 필드를 로그인 아이디로 사용하므로 userid로 몽구스에서 검색
            // user몽구스 모델을 이용하여 입력과 db비교하여 결과 리턴
            if(!user) {
                return done(null, false, {
                    message : 'Unknown user'
                });
            }
            if(!user.authenticate(password)) {
                return done(null, false, {
                    message : 'Invalid password'
                });
            }
            return done(null, user);
        });
    }));
};
