'use strict';

angular.module('mean.robots').controller('RobotsController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
}]);

angular.module('mean.robots').controller('RobotsController', function($scope, $location, $anchorScroll) {
    $scope.scrollTo = function(id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        $location.hash(old);
    };
});