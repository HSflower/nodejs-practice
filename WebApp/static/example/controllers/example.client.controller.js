angular.module('example').controller('ExampleController',
  ['$scope', 'Authentication',
    function($scope, Authentication) {
      $scope.authentication = Authentication;
      //  $scope.name = Authentication.user ? Authentication.user.username : 'Mean application'
    }
]);
// angular.module()메서드로 example모듈 가져옴
// ExampleController생성자 함수 생성
// 생성자 함수에 $scope객체 주입 - 의존성주입 사용
// 뷰에서 사용할 name속성을 정의하기 위해 $scope객체 사용

// Authentication서비스를 컨트롤러에 주입,
//  이를 이용해 user모델 name필드가 username을 참조.
//예제 Authentication 서비스 활용
