angular
	.module('qlik')
	.controller('home', ['$scope', '$location', 'session', 'userService', 'messageService', function($scope, $location, session, userService, messageService) {

	initialize();

	$scope.submit = function() {
		$scope.message.username = session.user;
		console.log($scope.message);

		messageService.createMessage($scope.message).then(function(response) {
			console.log('Success!');
			initialize();
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	$scope.selectedMessage = function(id) {
		$scope.selected ? $scope.selected = false : $scope.selected = true;
		console.log('Message id: ', id);
	}

	$scope.deleteMessage = function(id) {
		console.log('Message id: ', id);

		messageService.deleteMessageByID(id).then(function(response) {
			console.log('messageDeleted');
			initialize();
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
			$scope.newsfeed = false;
		});
	}
}])