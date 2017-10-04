angular
	.module('qlik')
	.controller('login', ['$scope', 'authentication', 'userService', login]);

function login($scope, authentication, userService) {

	/**
	 * Submits the login form and authenticates user credentials
	 */
	$scope.submit = function() {

		if ($scope.loginForm.$invalid) return;
		
		userService.authenticate($scope.credentials).then(function(response) {
			authentication.createSession($scope.credentials);
		})
		.catch(function(error) {
			console.log(error);
			$scope.error = true;
		});
	}
}