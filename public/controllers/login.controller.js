angular
	.module('qlik')
	.controller('login', ['$scope', '$location', 'session', 'userService', function($scope, $location, session, userService) {

	$scope.submit = function() {
		console.log($scope.credentials);
		if ($scope.loginForm.$invalid) return;

		session.create($scope.credentials.username);
		$location.path('/home');
	}
}]);