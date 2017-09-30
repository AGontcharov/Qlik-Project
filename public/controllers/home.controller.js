angular
	.module('qlik')
	.controller('home', ['$scope', '$location', 'session', 'userService', 'messageService', function($scope, $location, session, userService, messageService) {

	initialize();

	$scope.submit = function() {
		$scope.message.sender = session.user;
		console.log($scope.message);

		messageService.createMessage($scope.message).then(function(response) {
			console.log('Success!');
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	// Private function
	function initialize() {
		messageService.getMessages().then(function(response) {
			$scope.newsfeed = true;
			console.log(response.data);
			$scope.messages = response.data;
		})
		.catch(function(error) {
			console.log(error);
		});
	}
}])