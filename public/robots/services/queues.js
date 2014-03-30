'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.system').factory('Queues', ['$resource', function($resource) {
    return $resource('queues/:queueId', {
        queueId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);