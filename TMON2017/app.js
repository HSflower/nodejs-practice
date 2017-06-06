var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var stringify = require('json-stringify');

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }))

// post 방식 입력
app.get('/form', function(req,res){
  res.render('form');
  // form default=post, method='get'가능,
  // method='post'이면 출력시에도 쿼리스트링이 붙지않음
})
// post 방식입력을 get으로 출력(쿼리스트링으로 정보전송)
app.get('/form_receiver', function(req, res){
  var myObj, i, j, x = "";
  var myStr = req.query.description;
  myObj =JSON.parse(myStr); //json object
  var orderList = new Array();
  for (i in myObj.orders) {
      orderList.push(myObj.orders[i]);
  }
  var a = 20, b = 25, c = 15; //a number of drones
  var index = 0;
  var acount = 1, bcount = 1, ccount = 1;
  var aTime = new Array(10, 25, 30, 50, 60);
  var bTime = new Array(20, 10, 20, 40, 55);
  var cTime = new Array(60, 40, 25, 15, 20); //delivery time
  var delivery = new Array({"num":0, "time":0,"list":""}, {"num":0, "time":0,"list":""}, {"num":0, "time":0,"list":""});
  for(i in orderList){
    if(orderList[i].address == "1번지역") {
      index = 1;
      afirst(delivery, index);
    }
    else if(orderList[i].address == "2번지역"){
      index = 1;
      bfirst(delivery, index);
    } else if(orderList[i].address == "3번지역"){
      index = 2;
      bfirst(delivery, index);
    } else if(orderList[i].address == "4번지역"){
      index = 3;
      cfirst(delivery, index);
    } else if(orderList[i].address == "5번지역"){
      index = 4;
      cfirst(delivery, index);
    }
  }
  function afirst(delivery, index){
    if(a>0){
      a--;
      delivery[0].time += aTime[index];
      delivery[0].num++;
      delivery[0].list += orderList[i].orderNo+", ";
    } else if(b>0){
      b--;
      bTime[0] += bTime[index];
    }
  }
  function bfirst(delivery, index){
    if(b>0){
      b--;
      delivery[1].time += bTime[index];
      delivery[1].num++;
      delivery[1].list += orderList[i].orderNo+", ";
    } else if(count<3){ //b가 3번왕복하기를 기다리면 a가 가는게 나음
      b = 25;
      bcount++;
      delivery[1].time += bTime[1]*bcount;
      delivery[1].num++;
      delivery[1].list += orderList[i].orderNo +", ";
    } else {
      //a가 가거나 a창고 드론이 없는 경우 c창고 드론 사용
    }
  }
  function cfirst(delivery, index){
    if(c>0){
      c--;
      delivery[2].time += cTime[index];
      delivery[2].num++;
      delivery[2].list += orderList[i].orderNo+", ";
    } else if(b>0){
      bfirst(delivery, index) //시간도 공유가능하도록 코딩
    }
  }
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
        Hello, TMON!</br>
        <p>A창고</p>
        <p>주문처리건수: ${delivery[0].num}건</p>
        <p>예상처리시간: ${delivery[0].time}분</p>
        <p>처리대상: ${delivery[0].list}</p>
        <p>B창고</p>
        <p>주문처리건수: ${delivery[1].num}건</p>
        <p>예상처리시간: ${delivery[1].time}분</p>
        <p>처리대상: ${delivery[1].list}</p>
        <p>C창고</p>
        <p>주문처리건수: ${delivery[2].num}건</p>
        <p>예상처리시간: ${delivery[2].time}분</p>
        <p>처리대상: ${delivery[2].list}</p>
    </body>
  </html>`;
  res.send(output);
});
app.get('/', function(req, res){
    res.send('Hello home page');;
});
app.get('/route', function(req, res){
    res.send('')
})
app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});
