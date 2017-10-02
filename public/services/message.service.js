angular
	.module('qlik')
	.factory('messageService', ['$http', '$q', messageService]);

function messageService($http, $q) {

	var messageService = {};
	var BASE_URL = '/api';

	// Messages endpoints
	messageService.createMessage = function(message) {
		return $http.post(BASE_URL + '/messages', message).then(successHandle, function() { return errorHandle('Error posting message') });
	}

	messageService.getMessages = function() {
		return $http.get(BASE_URL + '/messages').then(successHandle, function() {return errorHandle('Error getting list of messages') });
	}

	messageService.getMessageByID = function(id) {
		return $http.get(BASE_URL + '/messages/' + id).then(successHandle, function() {return errorHandle('Error getting message by ID') });
	}

	messageService.deleteMessageByID = function(id) {
		return $http.delete(BASE_URL + '/messages/' + id).then(successHandle, function() {return errorHandle('Error deleting message by ID') });
	}

	messageService.isPalindrome = function(id) {
		return $http.get(BASE_URL + '/messages/' + id + '/palindrome').then(successHandle, function() {return errorHandle('Error checking if message is palindrome') });
	}


	// Private functions
	function successHandle(response) {
		return response;
	}

	function errorHandle(error) {
		return $q.reject(error);
	}

	return messageService;
}