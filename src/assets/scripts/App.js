angular.module('tic-tac-tangular', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider
        .when('/', {
            templateUrl: '../../partials/home.html'
        })
        .when('/game/', {
            templateUrl: '/partials/gameboard.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    })

;