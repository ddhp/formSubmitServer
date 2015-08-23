angular.module('myApp')
  .controller('LoginCtrl', function($scope, $http, $location, $window) {
    $scope.submit =  function (event) {
      var submitBtn = angular.element(event.currentTarget).find('.btn-submit');
      var submitUser;
      submitBtn.prop('disabled', true).html('Saving...');
      console.log('submit with ', $scope.email, $scope.password);
      submitUser = {
        email: $scope.email,
        password: $scope.password
      };

      $http.post('api/login', submitUser)
        .success(function(res) {
          // console.log('success');
          // $scope.users.push(submitUser);
          $scope.$broadcast('toastr', 'SUCCESS');
          submitBtn.prop('disabled', false).html('Submit');
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
  });
