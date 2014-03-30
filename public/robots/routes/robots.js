'use strict';

//Setting up route
angular.module('mean.articles').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // states for my app
        $stateProvider
            .state('lynx', {
                url: '/lynx',
                templateUrl: 'public/robots/views/lynx.html'
            })
            .state('thumper', {
                url: '/thumper',
                templateUrl: 'public/robots/views/thumper.html'
            })
    }
])