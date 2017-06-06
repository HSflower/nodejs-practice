var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//express로 template를 렌더링 하기 위해 app.set() 설정
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
// 정적파일의 상대위치의 루트폴더 지정
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

// post 방식 입력
app.get('/form', function(req,res){
  res.render('form');
  // form default=post, method='get'가능,
  // method='post'이면 출력시에도 쿼리스트링이 붙지않음
})
// post 방식입력을 get으로 출력(쿼리스트링으로 정보전송)
app.get('/form_receiver', function(req, res){
  //res.send('Hello, GET');
  var title = req.query.description;
  var description = req.query.description;
  res.send(title+', '+description);
});
// post방식으로 출력
app.post('/form_receiver', function(req, res){
  //res.send('Hello, POST');
  var title = req.body.title;
  var description = req.body.textarea;
  res.send(title+', '+description);
})

//query string
app.get('/topic/:id', function(req, res){
  var topics = [
    'Javascript is ...',
    'Nodejs is ...',
    'Express is ...'
  ];
  var output = `
  <!--<a href="/topic?id=0">JavaScript</a><br>-->
  <a href="/topic?0">Nodejs</a><br>
  <a href="/topic?1">Nodejs</a><br>
  <a href="/topic?2">Express</a><br><br>
  ${topics[req.params.id]}
  `
  // 버튼을 눌러서 해당 url로 들어가면
  // 아래에 출력되는 정보가 url에 따라 달라짐
  // ${topics[req.query.id]}
  res.send(output);
})
/*
app.get('/param/:module_id/:topic_id', function(req,res){
  res.json(req.params);
})
*/
//URL depth 2인 경우,
app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id+','+req.params.mode) //출력
})

app.get('/template', function(req, res){
  res.render('temp', {time:Date(), title:'Jade'});
})

app.get('/', function(req, res){
    res.send('Hello home page');;
});

//정적 페이지 생성 : .html 파일 이용
//동적 페이지 생성 방법
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

app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/route.png">')
})
app.get('/login', function(req, res){
    res.send('<h1>Login please</h1>');
});
app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});
