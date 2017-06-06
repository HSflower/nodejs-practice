var express = require('express');
var app = express();
// var bodyParser = require('body-parser');

//express로 template를 렌더링 하기 위해 app.set() 설정
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
// 정적파일의 상대위치의 루트폴더 지정
app.use(express.static('static'));
// app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req,res){
  res.send('hello');
  // form default=post, method='get'가능,
  // method='post'이면 출력시에도 쿼리스트링이 붙지않음
})

// post 방식 입력 : url= localhost:3000/home
app.get('/home', function(req,res){
  res.render('home');
  // form default=post, method='get'가능,
  // method='post'이면 출력시에도 쿼리스트링이 붙지않음
})

app.get('/board', function(req,res){
  res.render('board');
  // form default=post, method='get'가능,
  // method='post'이면 출력시에도 쿼리스트링이 붙지않음
})
app.get('/write', function(req,res){
  res.render('write');
  // form default=post, method='get'가능,
  // method='post'이면 출력시에도 쿼리스트링이 붙지않음
})
app.get('/inus', function(req,res){
  res.render('inus');
  // form default=post, method='get'가능,
  // method='post'이면 출력시에도 쿼리스트링이 붙지않음
})

//아래는 예시
app.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0; i<5; i++){
    lis = lis + '<li>coding</li>';
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
          ${lis}
        </ul>
        ${time}
    </body>
  </html>`;
  res.send(output);
});

app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});
