'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Global', 'Menus',
    function($scope, $rootScope, Global, Menus) {
        $scope.global = Global;
        $scope.menus = {};

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

        // Default hard coded menu items for main menu
        var defaultMainMenu = [{
            'roles': ['authenticated'],
            'title': 'Articles',
            'link': 'all articles'
        }, {
            'roles': ['authenticated'],
            'title': 'Create New Article',
            'link': 'create article'
        }];

        // Query menus added by modules. Only returns menus that user is allowed to see.
        function queryMenu(name, defaultMenu) {

            Menus.query({
                name: name,
                defaultMenu: defaultMenu
            }, function(menu) {
                console.log(menu)
                $scope.menus[name] = menu;
            });
        };

        // Query server for menus and check permissions
        queryMenu('main', defaultMainMenu);

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function() {

            queryMenu('main', defaultMainMenu);

            $scope.global = {
                authenticated: !! $rootScope.user,
                user: $rootScope.user
            };
        });

    }
]);
