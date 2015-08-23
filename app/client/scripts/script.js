/*jshint -W087 */
angular.module('myApp', ['ngCookies'])
  .controller('IndexCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
    $scope.name = 'index';
  }]);
