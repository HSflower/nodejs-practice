var apiKey ='API KEY를 입력해주세요';
var playlistId = 'PLuHgQVnccGMBttjsCipjhWgf6urfjTn14';
var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + playlistId + '&key=' + apiKey + '&maxResults=50';
 
function call(nextToken) {
  // 지금부터 XMLHttpRequest와 관련된 기능을 사용하겠습니다.
  var req = new XMLHttpRequest();
  // url에 해당되는 주소로 접속하고 싶어요. 
  var pageToken = '';
  if (nextToken) {
    pageToken = '&pageToken=' + nextToken;
  }
  req.open('GET', url + pageToken, true);
  req.onreadystatechange = function (aEvt) {
    if (req.readyState == 4) {
      if (req.status == 200) {
        var result = JSON.parse(req.responseText);
        var items = result.items;
        for (var i = 0; i < items.length; i++) {
          var vid = items[i].snippet.resourceId.videoId;
          var vurl = 'http://www.youtube.com/timedtext_video?ref=share&v=' + vid;
          console.log(items[i].snippet.title + '\t' + vurl);
        }
        if (result.nextPageToken) {
          call(result.nextPageToken);
        }
      } else {
        alert("Error loading page\n");
      }
    }
  };
  // 접속을 시작합니다.
  req.send(null);
}
call();