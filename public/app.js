var app = angular.module('qlik', ['ngRoute', 'ngCookies']);

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
	.otherwise({ redirectTo: '/home' });

	// Enable HTML5 History API - pretty URLs *_*
	$locationProvider.html5Mode(true);
}]);

app.run(['$rootScope', '$location', 'authentication', function($rootScope, $location, authentication) {

	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		authentication.refreshSession();

		if ($location.path() !== '/' && $location.path() !== '/login') {
			
			if (!authentication.isAuthenticated()) {
				console.log('DENY : Redirecting to login page');
				event.preventDefault();
			 	$location.path('/login');
			}
		}
	});
}]);