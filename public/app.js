angular
    .module('qlik', ['app.auth', 'ngRoute'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', config]);

function config($routeProvider, $locationProvider, $httpProvider) {
    
    // Configure routes for the app
    $routeProvider.when('/', {
        templateUrl: '/views/register.html',
        controller: 'register'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'login'
    })
    .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'home'
    })
    .otherwise({ redirectTo: '/home' });

    // Enable HTML5 History API - pretty URLs *_*
    $locationProvider.html5Mode(true);
}