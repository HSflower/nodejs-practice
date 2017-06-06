process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//process.env.NODE_ENV default = development로 설정
//cmd창에서 set NODE_ENV=development로도 설정가능
var express = require('./config/express_config'),
    passport = require('./config/passport');
//환경구성파일 require

//db에 몽구스 객체 할당
var app = express();

app.listen(3000);
module.exports = app;

console.log('Server running at localhost');
//접속후 로그정보가 log된다.

/* 기본적인 서버 실행
app.use('/', function(req,res){
  res.send('Hello World');
});
//res.send() 메소드에 버퍼를 전달 할 때,
//Content-type 헤더는 application/octet-stream 으로 설정되고 ,
//문자열 일때는 text/html , 객체나 배열일 때는 application/json 으로 설정

app.listen(3000);
//express는 connect 라는 미들웨어를 포함하고 있기 때문에 특정 경로로 들어오는 요청을 손쉽게 처리
console.log('Server running at http://localhost:3000');
*/
/* 기본적인 서버 실행 unused express
var http = require('http');
http.createServer(function(req,res) {
  res.writeHead(200, {
   'Content-Type' : 'text/plain'
   });
   res.end('Hello World');
}).listen(3000);

console.log('Server running at http://localhost:3000/');
*/
