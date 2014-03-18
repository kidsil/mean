'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$location', '$anchorScroll', 'Global', 'Follows', function ($scope, $location, $anchorScroll, Global, Follows) {
    $scope.global = Global;

    $scope.create = function() {
        var follow = new Follows({
            email: this.email
        });
        follow.$save(function() {
            $scope.followed = true;
        });

        this.email = '';
    };

    $scope.scrollTo = function(id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        $location.hash(old);
    };

}]);