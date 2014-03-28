'use strict';

angular.module('mean.robots').controller('RobotsController', ['$scope', '$location', '$anchorScroll', 'Global', 'Queues', function ($scope, $location, $anchorScroll, Global, Queues) {
    $scope.global = Global;
    $scope.queuelength = 'Queue Length: N/A';
    $scope.currentposition = 'Your Position: N/A';

    $scope.scrollTo = function(id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        $location.hash(old);
    };

    $scope.joinQueue = function() {
        var queue = new Queues();
        queue.$save(function() {
            var queueLength = angular.element('#queuelength').html();
            var position = (parseInt(queueLength.substr(14, queueLength.length)) + 1).toString();

            if (position === 'NaN') {
                angular.element('#currentposition').html('Entering Queue...');
            }
            else {
                angular.element('#currentposition').html('Your Position: ' + position);
            }

        });

        queue.session_id = '';
    };

}]);