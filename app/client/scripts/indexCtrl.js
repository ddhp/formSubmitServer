angular.module('myApp')
  .controller('IndexCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
    $scope.users = [];

    $http.get('api/users').success(function (data, status) {
      console.log(data);
      $scope.users = data.users;
    }).error(function (data, status) {
      console.log(data);
    });

    // check login status
    $http.get('api/me').success(function(data) {
      $scope.name = data.users[0].email;
      $scope.isLogin = true;
    });
  }]);
