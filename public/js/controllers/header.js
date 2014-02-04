'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    // $scope.menu = [{
    //     'title': 'Articles',
    //     'link': 'articles'
    // }, {
    //     'title': 'Create New Article',
    //     'link': 'articles/create'
    // }];

    $scope.menu = [{
        'title': 'Home',
        'link': ''
    }, {
        'title': 'Control the Lynx',
        'link': 'lynx'
    }, {
        'title': 'Control the Thumper',
        'link': 'thumper'
    }];
    
    $scope.isCollapsed = false;
}]);