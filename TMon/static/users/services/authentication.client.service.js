angular.module('users').factory('Authentication', [
        function() {
            this.user = window.user;
            // angular.js 서비스에서 온 window.user 객체 사용 
            return {
                user : this.user
            };
        };
]);
