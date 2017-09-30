var app = angular.module('qlik', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
	
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
	.otherwise({ redirectTo: '/' });

	// Enable HTML5 History API - pretty URLs *_*
	$locationProvider.html5Mode(true);
}]);