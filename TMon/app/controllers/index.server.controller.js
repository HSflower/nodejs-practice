exports.render  = function(req,res) {
  res.render('index', {
    title : 'Hello Word',
    //username : req.user ? req.user.username : ''
    user : JSON.stringify(req.user)
  });
  /*
  // passport인증을 위해 index 라우팅파일도 전면수정 - index.ejs에서 보여줄 변수 정의
  if(req.session.lastVisit){
    console.log(req.session.lastVisit);
  }
  var time = new Date();
  req.session.lastVisit = time.getFullYear() + "-" +(time.getMonth()+1)
    +"-"+time.getDate()+" .. "+time.getHours()+"-"
    +time.getMinutes()+"-"+time.getSeconds();
  //res.send('FirstMsg');
  //index.ejs파일을 이용, 템플릿에 들어갈 변수설정
  res.render('index', {title : 'First Title'});
  */
};
//기본화면으로 들어오는 사용자에게 보여지는 첫번째 컨트롤러
//이 controller를 라우팅해서 사용 - app/routes폴더에서 연결
