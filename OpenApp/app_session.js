var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
//secre : key, resave: 세션아이디를 접속시마다 새롭게 발급하지 않음
//saveUninitialized: 세션아이디를 세션을 사용하기 전까지 발급하지 마라
var FileStore = require('session-file-store')(session);
//express-session이 메모리에 저장하는데 이 모듈을 이용해서 파일에 저장
var MySQLStore = require('express-mysql-session')(session);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: '128957984!!@$aksg',
  resave: false,
  saveUninitialized: true,
  //store: new FileStore()
  // store:new MySQLStore({
  //   host:'localhost',
  //   port:3306,
  //   user:'root',
  //   password:'111111',
  //   database:'user'
  // })
}));
//인자로 다양한 option사용 가능 npm사이트에서 확인
//기본 세션 저장소는 directory 'sessions' 생성하여 이용
//다시 로그인해도 새로 세션 파일이 생성되지 않음 - 서버에 이미 등록되었으므로

//routing
app.get('/auth/logout', function(req, res){
  delete req.session.displayName;
  req.session.save(function(){
    res.redirect('/welcome');
  }); //save의 인자로 실행하면, 저장이후 redirection
})
app.get('/welcome', function(req, res){
  //res.send(req.session);
  if(req.session.displayName){ //session이 부여되어 displayName이 존재하면, login성공
    res.send(`
      <h1>Hello, ${req.session.displayName}</h1>
      <a href="/auth/logout">logout</a>
      `);
  } else{
    res.send(`
      <h1>Welcome</h1>
      <a href="/auth/login">Login</a>
      `);
  }
});
app.post('/auth/login', function(req, res){
  var uname = req.body.username;
  var pwd = req.body.password;
  //login 정보 : db에서 가져오는것 대신 객체 생성
  var user = {
    username: 'id',
    password: '123',
    displayName: 'nickname'
  };
  //login process
  if(uname === user.username && pwd === user.password){
    req.session.displayName = user.displayName; //session id에 해당하는 정보로서 session값 설정
    //res.send('hello master');
    res.redirect('/welcome');
  } else {
    res.send(uname+', who are you?<br><a href="/auth/login">login</a>');
  }
});
app.get('/auth/login', function(req, res){
  var output = `<h1>login</h1>
  <form action="/auth/login" method="post">
    <p>
      <input type="text" name="username" placeholder="username">
    </p>
    <p><!--p tag = enter-->
      <input type="password" name="password" placeholder="password">
    </p>
    <p><!--p tag = enter-->
      <input type="submit">
    </p>
  </form>
  `;
  res.send(output);
});
app.get('/count', function(req,res){
  if(req.session.count){ //count값이 설정되었는지 확인
    req.session.count++;
  } else {
    req.session.count=1; //connect.sid가 설정됨.
  }
  // 서버입장에서는 sid별로 해당 사용자에게만 count값을 주는 거고,
  // 클라이언트에서는 발급된 session id에 해당하는 count값에 접근가능
  res.send('count: '+req.session.count);
});

app.listen(3004, function(){
  console.log('connected 3004 port :D');
});
