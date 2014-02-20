'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // For unmatched routes:
        $urlRouterProvider.otherwise('/');

        // states for my app
        $stateProvider
        .state('all articles', {
            url: '/articles',
            templateUrl: 'views/articles/list.html'
        })
        .state('create article', {
            url: '/articles/create',
            templateUrl: 'views/articles/create.html'
        })
        .state('edit article', {
            url: '/articles/:articleId/edit',
            templateUrl: 'views/articles/edit.html'
        })
        .state('article by id', {
            url: '/articles/:articleId',
            templateUrl: 'views/articles/view.html'
        })
        .state('lynx', {
            url: '/lynx',
            templateUrl: 'views/robots/lynx.html'
        })
        .state('thumper', {
            url: '/thumper',
            templateUrl: 'views/robots/thumper.html'
        })
        .state('home', {
            url: '/',
            templateUrl: 'views/index.html'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');

        // if(window.history && window.history.pushState){
        //     $locationProvider.html5Mode(true);
        // }
    }
]);
