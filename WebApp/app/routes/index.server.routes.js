module.exports = function(app) {
  var index = require('../controllers/index.server.controller');
  //controller파일을 require하고,
  app.get('/', index.render);
  //app.get으로 render수행
}

/*
app.get('/', function(req,res) {
  res.send('This is a GET')
})

app.post('/', function(req,res) {
 res.send('This is a POST')
})
//get과 post로 들어오는 요청에 대해 미들웨어 함수 수행

app.route('/').get(function(req,res) {
 res.send('This is a GET');
}).post(function(req,res) {
 res.send('This Is a POST');
})
// 미들웨어 연쇄형태로 실행

//단일 라우팅에 대해서도 미들웨어를 연쇄 형태로 정의하는 방법도 존재한다.
//next() 함수를 사용하여 미들웨어를 넘기는 식으로 수행 순서를 결정
var express = require('express');
var app = express();
 //express모듈 호출,
var question = function(req, res, next) {
 if(req.param('answer')) {
   next();
  }else {
   res.send('so what is your answer?')
  }
};
//question과 result 미들웨어를 정의
//answer이라는 파라미터 확인하고, 다음으로 넘겨서
//good이라고 응답한다.
//answer이라는 파라미터가 없으면 질문하는 응답을보낸다.
var result = function(req,res) {
  res.send('good')
}

//'/'라우팅경로로 들어오는 사용자에게 question먼저하고 next호출시 result미들웨어 수행
app.get('/', question , result);
app.listen(3000);
console.log('server start');
*/
