angular
	.module('qlik')
	.controller('home', ['$scope', 'session', 'userService', 'messageService', function($scope, session, userService, messageService) {

	initialize();

	$scope.submit = function() {
		$scope.message.username = session.user;

		messageService.createMessage($scope.message).then(function(response) {
			$scope.message.subject = '';
			$scope.message.content = '';
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

	$scope.isPalindrome = function(id) {
		console.log('Message id: ', id);

		messageService.isPalindrome(id).then(function(response) {
			console.log('palindrome: ', response.data);
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	// Private function
	function initialize() {
		messageService.getMessages().then(function(response) {
			$scope.newsfeed = true;
			$scope.messages = response.data;
		})
		.catch(function(error) {
			console.log(error);
			$scope.newsfeed = false;
		});
	}
}])