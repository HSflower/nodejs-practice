var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser('19284239582!'));

var products = {
  1:{title:'The history of web1'},
  2:{title:'The next web'},
  3:{title:'??'}
};
app.get('/products', function(req, res){
  var output = '';
  for(var name in products){ //products가 가지고 있는 값들 만큼 name의 값으로 객체의 속성명이 할당되는 js반복문
    output += `
      <li>
        <a href="/cart/${name}">${products[name].title}</a>
      </li>`; //html출력방벙
  }
  res.send(`<h1>Products</h1><ul>${output}</ul>
      <a href="/cart">Cart</a>`); //전체 html규격대로는 출력안되는 코드
})
/* 사용자의 쿠키 cart의 형태string
cart = {
  1:2,
  2:1,
  3:
} */
app.get('/cart/:id', function(req, res){ //id변수생성하여 client에게 전달
  var id = req.params.id;
  if(req.cookies.cart){
    var cart = req.cookies.cart; //사용자cookie에서 값 가져오기
  } else {
    var cart = {};
  }
  if(!cart[id]){
    cart[id] = 0; //cart[id]번째가 없을때, 값을 0으로 갖는 cart[id]생성
  }
  cart[id] = parseInt(cart[id])+1;
  res.cookie('cart', cart);
  res.redirect('/cart');
});
app.get('/cart', function(req, res){
  var cart = req.cookies.cart;
  if(!cart){
    res.send('empty');
  }
  var output = '';
  for(var id in cart){
    output += `<li>${products[id].title} (${cart[id]})</li>`;
  }
  res.send(`
    <h1>Cart</h1>
    <ul>${output}</ul>
    <a href="/products">Products List</a>`);
});
app.get('/count', function(req, res){
  if(req.cookies.count){ //req.cookies.count는 string형식
    var count = parseInt(req.cookies.count);
  } else {
    var count = 0;
  }
  count = count+1;
  res.cookie('count', count); //header에 set-cookie라는 속성이 생김
  res.send('count : '+req.cookies.count); //브라우저에서 요청받은request.cookies사용가능
});

app.listen(3003, function(){
  console.log('connected 3003 port :D');
});
