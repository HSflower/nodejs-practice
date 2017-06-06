angular.module('articles').controller('ArticlesController',
  ['$scope',
  '$routeParams','$location','Authentication','Articles',
    function($scope,$routeParams,$location,Authentication,Articles) {
        $scope.authentication = Authentication;
    // 주입된 4가지 서비스를 사용하는 방식
    // routeParams, location, Authentication, Articles(앞에서 만든서비스)
    // Authentication + scope로 뷰에서도 사용가능

    $scope.create = function() {
        var article = new Articles({
            title : this.title,
            content : this.content
        });

        article.$save(function(response) {
            $location.path('articles/' + response._id);
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

    //전체 리스트를 출력하기 위해 자원의 query() 메소드를 사용
    $scope.find = function() {
        $scope.articles = Articles.query();
    };

    //단일 다큐먼트를 인출하기 위해 자원의 get() 메소드를 사용
    //URL에서 직접 얻은 articleId 라우트 매개변수에 기반한 단일 글을 인출
    $scope.findOne = function() {
        $scope.article = Articles.get({
            articleId : $routeParams.articleId
        });
    };

    // $scope.article 변수를 사용하여 ,뷰 입력 내용으로 글을 갱신하고,
    //대응하는 RESTful 종단점과 통신하기 위해 위 다른 메소드와 마찬가지로 Articles 서비스를 사용하며,
    //갱신된 다큐먼트를 저장
    $scope.update = function() {
        $scope.article.$update(function(){
          //첫번째 콜백은 성공적인 HTTP 요청을 표시하는 성공(200) 상태 코드로 서버가 응답할 때 실행
            $location.path('articles/' + $scope.article._id);
        }, function(errorResponse){
          //실패한 HTTP 요청을 표시하는 오류 상태 코드로 서버가 응답할 때 실행
            $scope.error = errorResponse.data.message;
        });
    };

    //사용자는 read 뷰는 물론이고 list 뷰에서 글을 지울지도 모르기에,
    //delete() 메소드는 $scope.article 또는 $scope.articles 변수를 사용
    $scope.delete = function(article) {
        if (article) {
          //$remove()메소드로 RESTful 종단점 호출
            article.$remove(function() {
                for (var i in $scope.articles) {
                    if($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            });
        } else {
            $scope.article.$remove(function() {
                $location.path('articles');
            });
        }
    };
}
]);
