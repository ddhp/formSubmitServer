angular.module('submitApp', [])
  .controller('IndexCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.name = "";
    $scope.password = "";

    $scope.users = [];

    $http.get('/user').success(function (data, status) {
      console.log(data);
      $scope.users = data.users;
    }).error(function (data, status) {
      console.log(data);
    });

    $scope.submit =  function () {
      console.log('submit with ', $scope.email, $scope.password);
      d = $.post('http://127.0.0.1:3000/user', {
        email: $scope.email,
        password: $scope.password
      }, {
        contentType: 'application/json'
      })
      d.done(function (r) {
         console.log('success');
      }).fail(function (err) {
        console.log('failed ', err);
      })
    };
  }])
