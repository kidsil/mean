'use strict';

angular.module('mean.robots').controller('RobotsController', ['$scope', '$location', '$anchorScroll', 'Global', function ($scope, $location, $anchorScroll, Global) {
    $scope.global = Global;

    $scope.scrollTo = function(id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        $location.hash(old);
    };
}]);