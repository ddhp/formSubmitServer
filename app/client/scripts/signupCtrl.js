angular.module('myApp')
  .controller('signupCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.name = "";
    $scope.password = "";

    $scope.submit =  function (event) {
      var submitBtn = angular.element(event.currentTarget).find('.btn-submit');
      var submitUser;
      submitBtn.prop('disabled', true).html('Saving...');
      console.log('submit with ', $scope.email, $scope.password);
      submitUser = {
        email: $scope.email,
        password: $scope.password
      };

      $http.post('api/users', submitUser)
        .success(function(res) {
          console.log('success');
          submitBtn.prop('disabled', false).html('Submit');
          $scope.$broadcast('toastr', 'SUCCESS');
          $window.location.href = $window.location.protocol + 
            '//' + 
            $window.location.host + '/';
        })
        .error(function(err) {
          console.log('failed ', err);
          submitBtn.prop('disabled', false).html('Submit');
          $scope.$broadcast('toastr', 'FAILED');
        });
    };
  }]);
