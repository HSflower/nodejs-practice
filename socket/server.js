var http = require('http');
http.createServer(function(request, response){
  request.on('error', function(err){
    console.log(err);
  }).on('data', function(data){
    console.log(data);
  }).on('end', function(){
    response.on('error', function(err){
      console.error(err);
    });
    //end의 콜백에 response해줍니다.
    //일단 response에도 에러가 생길 수 있으니, response.on('error', 콜백)로 에러를 처리해줍시다.
    //response.statusCode는 여러 개가 있는데 지금은 성공적으로 데이터를 전송했다는 것을 알려야하니까 성공의 의미인 200을 설정합니다.
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/planin');
    response.write('hi\n');
    response.end('the end!');
  });
}).listen(8080);
//request의 data가 있을 경우 처리하는 부분과,
// data 처리가 다 끝났음을 알려주는 부분입니다.
//request에 data가 있는 경우는 HTML 폼 전송같이 폼의 내용을 전송하는 경우 데이터가 request의 data에 실려 서버로 전송됩니다.
