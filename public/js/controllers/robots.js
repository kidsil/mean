'use strict';

angular.module('mean.robots').controller('RobotsController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
}]);