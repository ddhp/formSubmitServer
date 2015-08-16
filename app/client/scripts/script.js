angular.module('submitApp', [])
  .controller('IndexCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.name = "";
    $scope.password = "";

    $scope.users = [];

    $http.get('/users').success(function (data, status) {
      console.log(data);
      $scope.users = data.users;
    }).error(function (data, status) {
      console.log(data);
    });

    $scope.submit =  function (event) {
      var submitBtn = angular.element(event.currentTarget).find('.btn-submit');
      var submitUser;
      submitBtn.prop('disabled', true).html('Saving...');
      console.log('submit with ', $scope.email, $scope.password);
      submitUser = {
        email: $scope.email,
        password: $scope.password
      };

      $http.post('/users', submitUser)
        .success(function(res) {
          console.log('success');
          $scope.users.push(submitUser);
          submitBtn.prop('disabled', false).html('Submit');
          $scope.$broadcast('toastr', 'SUCCESS');
        })
        .error(function(err) {
          console.log('failed ', err);
          submitBtn.prop('disabled', false).html('Submit');
          $scope.$broadcast('toastr', 'FAILED');
        });
    };
  }]);
