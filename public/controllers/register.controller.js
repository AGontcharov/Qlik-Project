angular
	.module('qlik')
	.controller('register', ['$scope', '$location', 'authentication', 'userService', function($scope, $location, authentication, userService) {

	$scope.submit = function() {
		console.log($scope.account);

		if ($scope.registerForm.$invalid) return;
		$scope.account.role = 'GUEST';

		userService.createUser($scope.account).then(function(response) {
			authentication.createSession($scope.account);
			$location.path('/home');
		})
		.catch(function(error) {
			console.log(error);
			$scope.error = true;
		});
	}
}]);