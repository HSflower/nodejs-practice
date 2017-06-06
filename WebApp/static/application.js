var mainApplicationModuleName = 'mean';
 //주 앱의 모둘이름을 포함한 변수 생성
var mainApplicationModule = angular.module(mainApplicationModuleName,
   [ 'ngResource','ngRoute', 'users','example', 'articles' ]);
 // 주 앱의 모듈을 사용하기 위해 module에서 주 앱의 모듈을 인수로 사용

mainApplicationModule.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

// 페북 리다이렉트 버그(URL해시#_=_추가문제) 해결
if(window.location.hash === '#_=_') window.location.hash = '#!';   // 추가

// angular객체의 jqList기능(jQuery List?)을 이용해서
// document.ready이벤트에 함수 결합
angular.element(document).ready(function(){
  // angular.bootstrap()으로 주 애플리케이션 모듈로 angular.js애플리케이션을 시작하게 만든다.
    angular.bootstrap(document, [mainApplicationModuleName]);
});
