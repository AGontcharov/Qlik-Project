angular
	.module('qlik')
	.controller('login', ['$scope', '$location', 'authentication', 'userService', function($scope, $location, authentication, userService) {

	$scope.submit = function() {
		console.log($scope.credentials);
		$scope.credentials.role = 'GUEST';

		if ($scope.loginForm.$invalid) return;

		userService.authenticate($scope.credentials).then(function(response) {
			authentication.createSession($scope.credentials);
			$location.path('/home');
		})
		.catch(function(error) {
			console.log(error);
			$scope.error = true;
		});
	}
}]);