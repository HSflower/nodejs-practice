// controller추가 후, route추가
var User = require('mongoose').model('User'),
  passport = require('passport');
//mongoose모듈을 사용해 정의했던 User모델 require(불러오기)

//passport인증에 필요한 컨트롤러

//몽구스 error객체에서 통합된 오류메시지를 반환, 비공개메서드
var getErrorMessage = function(err){
  var message = '';
  //err.code : MongoDB자체 에러 코드
  //err.errors : 내가 제작한 몽구스 검증오류 메시지
  if(err.code){
    switch(err.code){
      case 11000:
      case 11001:
      message = 'UserID already exists';
      break;
      default:
      message = 'Something went Wrong';
    }
  } else {
    for(var errName in err.errors){
      if(err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};
//뷰 제작을 위해 호출, title과 messages정보 출력
exports.renderSignin = function(req, res, next){
  if(!req.user){
    res.render('signin', {
      title : 'Sign-in Form',
      messages : req.flash('error') || req.flash('info')
    });
  } else {
    return res.redirect('/');
  }
};
exports.renderSignup = function(req, res, next){
  if (!req.user) {
        res.render('signup', {
            title : 'Sign-up Form',
            messages : req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};
//새로운 사용자 생성, User모델 사용,
// HTTP요청에서 user객체 생성 후 mongoDB에 저장
exports.signup = function(req,res,next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;

        user.provider = 'local';
        //user객체 생성, mongoDB에 저장
        user.save(function(err) {
            console.log('save');
            if(err) {
                message = getErrorMessage(err);
                //flash : 세션객체영역에 임시메시지 저장하는 노드모듈
                // connect-flash모듈 설치 필요
                req.flash('error', message);
                return res.redirect('/signup');
            }
            //passport모듈이 제공하는 req.login모듈 사용하여 세션생성
            req.login(user, function(err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};
exports.signout = function(req,res) {
    req.logout();
    res.redirect('/');
};

exports.requiresLogin = function(req,res,next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message : 'User is not logged in'
        });
    }
    next();
};

/*
//컨트롤러 메소드 create사용
exports.create = function(req, res, next){
  var user = new User(req.body);
  //User에 정의된 스키마에 맞는 document생성하고 body데이터 입력

  // (mongoose모듈로 정의한 User객체를 이용해)
  // mongoDB의 save명령어 이용
  user.save(function(err){
    if(err){
      return next(err); //에러시 미들웨어로 전달
    } else{
      res.json(user);
      // mongoDB에 저장하고,
      //저장된 데이터를 json방식으로 응답res
    }
  });
};

exports.list = function(req, res, next){
  User.find(function(err, users){
    if(err){
      return next(err);
    } else {
      res.json(users)
    }
  })
}

//CRUD메서드 중 read메소드
exports.read = function(req,res){
  res.json(req.user);
};

exports.userByID = function(req, res, next, id){
  //findOne은 부분집합의 첫 doc data만 가져온다.
  User.findOne({
    _id : id
  }, function(err, user){
    if(err){
      return next(err);
    } else {
      req.user = user;
      next();
    }
  })
}

exports.update = function(req, res, next){
  //메서드의 인수, 갱신할 user.id
  //변경할 내용이 담긴 req.body
  User.findByIdAndUpdate(req.user.id, req.body, function(err,user){
    if(err){
      return next(err);
    } else {
      res.json(user);
    }
  });
};

// _id값으로 삭제
exports.delete = function(req, res, next){
  req.user.remove(function(err){
    if(err){
      return next(err);
    } else {
      res.json(req.user);
    }
  })
};
*/
