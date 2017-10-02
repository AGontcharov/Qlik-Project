angular
	.module('qlik')
	.controller('home', ['$scope', 'session', 'messageService', home]);

function home($scope, session, messageService) {

	activate();

	$scope.submit = function() {
		$scope.message.username = session.user;

		messageService.createMessage($scope.message).then(function(response) {
			
			// Clear message form
			$scope.message.subject = '';
			$scope.message.content = '';
			activate();
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
			activate();
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	$scope.isPalindrome = function(message) {
		
		// Prevent message contents from closing
		message.selected = false;

		messageService.isPalindrome(message.MessageID).then(function(response) {
			message.palindrome = response.data;
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	
	// Private function
	function activate() {
		messageService.getMessages().then(function(response) {
			$scope.newsfeed = true;
			$scope.messages = response.data;
		})
		.catch(function(error) {
			console.log(error);
			$scope.newsfeed = false;
		});
	}
}