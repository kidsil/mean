'use strict';

//Setting up route
angular.module('mean.articles').config(['$stateProvider',
    function($stateProvider) {
        // states for my app
        $stateProvider
            .state('lynx', {
                url: '/lynx',
                templateUrl: 'public/robots/views/lynx.html'
            })
            .state('thumper', {
                url: '/thumper',
                templateUrl: 'public/robots/views/thumper.html'
            });
    }
]);