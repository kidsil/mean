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
        'state': 'home',
        'link': ''
    }, {
        'title': 'Control the Lynx',
        'state': 'lynx',
        'link': 'lynx'
    }, {
        'title': 'Control the Thumper',
        'state': 'thumper',
        'link': 'thumper'
    }];
    
    $scope.isCollapsed = false;
}]);