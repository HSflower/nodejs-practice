var express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    config = require('./config'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash')
    ;
    // express_config에서 config.js를 불러오고,
    //  config.js에서 env/evelopment.js를 불러온다.
    //process.env속성을 사용하기 위해 필요한 모듈 추가
//var uri = 'mongodb://localhost/database' ;
//var db = require('mongoose').connect(uri);

module.exports = function() {
    var app = express();
    //process.env속성에 따라 다른 모듈 사용
    if(process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended : true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
      saveUninitialized : true,
      resave : true,
      secret : config.sessionSecret
    }));
    //secret옵션은 비밀키 설정, saveUninitialized는 초기화되지 않은 세션정보도 저장하는 여부 옵션
    //  resave는 같은 세션정보라도 다시 저장할건지 옵션(default = true)
    //  기본옵션으로 위 세가지 옵션은 필수

    //app.set() : 앱의 전반적인 설정을 읽고쓰는 장소 제공 - (키,값)형식
    //개발자가 지정, 아래는 express에서 특정하게 사용하는 용도
    app.set('views', './app/views');  // views = view파일이 모여있는 장소
    app.set('view engine', 'ejs');    // view engine = express의 view template로 ejs사용(설정)

    app.use(flash());
    app.use(passport.initialize()); //미들웨어 추가 - 패스포트모듈초기화 모듈
    app.use(passport.session()); //미들웨어 추가 - 사용자의 세션 추적 모듈

    //라우팅 미들웨어 사용
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/articles.server.routes.js')(app);
    app.use(express.static('./static'));

    return app;
}
//express관련 설정과 구성 초기화 역할을 하는 파일이 되었다.
//express를 require해서
//module.exports로 app에 express를 담고, 라우팅파일도 require해서 return
