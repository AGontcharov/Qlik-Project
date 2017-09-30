angular
	.module('qlik')
	.controller('navbar', ['$scope', 'authentication', function($scope, authentication) {

	$scope.logout = function() {
		authentication.logout();
	}
}]);