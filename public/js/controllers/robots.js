'use strict';

angular.module('mean.robots').controller('RobotsController', ['$scope', '$location', '$anchorScroll', 'Global', 'Queues', function ($scope, $location, $anchorScroll, Global, Queues) {
    $scope.global = Global;

    $scope.scrollTo = function(id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        $location.hash(old);
    };

    $scope.joinQueue = function() {
        var queue = new Queues();
        queue.$save();
        queue.session_id = '';
    };
}]);