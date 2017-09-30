angular
	.module('qlik')
	.controller('register', ['$scope', '$location', 'session', 'userService', function($scope, $location, session, userService) {

	$scope.submit = function() {
		console.log($scope.account);
		if ($scope.registerForm.$invalid) return;

		userService.createUser($scope.account).then(function(response) {
			session.create($scope.account.username, "GUEST");
			$location.path('/home');
			// $scope.registerForm.$setPristine();
		})
		.catch(function(error) {
			console.log(error);
			$scope.error = true;
			// $scope.registerForm.$setPristine();
		});
	}
}]);