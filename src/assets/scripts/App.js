angular.module('tic-tac-tangular', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider
        .when('/'{
            templateURL: 'home.html'
        })
        .when('/game/',{
            templateURL: 'gameboard.html'
        });
    })

;