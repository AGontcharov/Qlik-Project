angular
	.module('qlik')
	.controller('home', ['$scope', 'session', 'messageService', function($scope, session, messageService) {

	initialize();

	$scope.submit = function() {
		$scope.message.username = session.user;

		messageService.createMessage($scope.message).then(function(response) {
			
			// Clear message form
			$scope.message.subject = '';
			$scope.message.content = '';
			initialize();
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	$scope.selectedMessage = function(message) {
		message.selected ? message.selected = false : message.selected = true;
	}

	$scope.deleteMessage = function(id) {

		messageService.deleteMessageByID(id).then(function(response) {
			initialize();
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	$scope.isPalindrome = function(message) {

		messageService.isPalindrome(message.MessageID).then(function(response) {
			message.palindrome = response.data;
		})
		.catch(function(error) {
			console.log(error);
		});

		// Prevent message contents from closing
		message.selected = false;
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