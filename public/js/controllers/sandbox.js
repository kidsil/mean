'use strict';

angular.module('mean.sandbox').controller('SandboxController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
}]);