var users = require('../../app/controllers/users.server.controller'),
  passport = require('passport');
//컨트롤러를 불러오고

module.exports = function(app) {
    app.route('/signup')
    .post(users.signup)
    .get(users.renderSignup);
    //express의 route기능으로 post형식을 이용하여 /users로 들어가서
    // 컨트롤러의 create메소드 실행

    // 컨트롤러의 read메소드 실행
    app.route('/signin') //express:문자열 앞에 :추가시 매개변수취급
    .get(users.renderSignin)
    .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true
    }));
    // post요청으로 들어오는 경우,
    //  authenticate메서드가 수행되고, 첫인수는 인증전략으로 사용,
    //  아래의 옵션은 successRedirect:패스포트에게 성공적으로 사용자를 인증하고, 요청을 전환할 위치를 알려줌
    //  failureRedirect : 패스포트에게 사용자가 인증을 실행하고, 요청을 전환할 위치를 알려줌.
    //  failureFlash : 패스포트에게 flash 메시지를 사용할지 여부 알려줌.
    /*
    //컨트롤러 변경됨 - passport인증을 위해
     .put(users.update)
     .delete(users.delete); //http메서드 종류별 메서드 실행
     app.param('userId', users.userByID);
    //userId를 이용하여 users.userByID메서드 먼저 수행
    */
    app.get('/signout', users.signout);

    //추후 angular.js를 위해 RESTful API에 맞춰 라우팅 구성
};
