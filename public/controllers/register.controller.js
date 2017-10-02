angular
	.module('qlik')
	.controller('register', ['$scope', 'authentication', 'userService', register]); 

function register($scope, authentication, userService) {

	$scope.submit = function() {

		if ($scope.registerForm.$invalid) return;

		userService.createUser($scope.account).then(function(response) {
			authentication.createSession($scope.account);
		})
		.catch(function(error) {
			console.log(error);
			$scope.error = true;
		});
	}
}