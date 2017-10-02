angular
	.module('qlik')
	.controller('navbar', ['$scope', 'authentication', navbar]); 

function navbar($scope, authentication) {

	$scope.logout = function() {
		authentication.logout();
	}
}