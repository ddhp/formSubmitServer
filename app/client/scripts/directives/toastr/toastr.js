angular.module('submitApp')
  .directive('toastr', ['$interval', function ($interval) {
    'use strict';
    return {
      restrict: 'E',
      scope: {},
      controller: function ($scope, $element, $interval) {
        $scope.text = 'Successful';
        $scope.class= '';
        // an event named 'toastr' fired
        // when they need to manipulate toastr
        $scope.$on('toastr', function (event, type) {
          $element.find('div').removeClass('hidden');
          $interval(function () {
            $element.find('div').addClass('hidden');
            $interval.cancel(this);
          }, 2000);
          
          switch (type) {
            case 'SUCCESS':
              $scope.class = 'bg-primary';
              break;
            case 'FAILED':
              $scope.class = 'bg-danger';
              break;
            default:
              $scope.class = 'bg-primary';
          }
          // $scope.$apply();
        });
      },
      templateUrl: 'scripts/directives/toastr/toastr.html'
    };
  }]);
