'use strict';

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {templateUrl: './assets/partials/search.html', controller: 'SearchCtrl'})
            .when('/error', {templateUrl: './assets/partials/error.html', controller: 'ErrorCtrl'})
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);

