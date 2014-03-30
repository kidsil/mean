'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.system').factory('Follows', ['$resource', function($resource) {
    return $resource('follows/:followId', {
        followId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);