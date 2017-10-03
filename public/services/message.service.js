angular
	.module('qlik')
	.factory('messageService', ['$http', '$q', messageService]);

function messageService($http, $q) {

	var messageService = {};
	var BASE_URL = '/api';

	// Messages endpoints
	messageService.createMessage = function(message) {
		return $http.post(BASE_URL + '/messages', message).then(successHandle, function(response) { return errorHandle(response, 'Error posting message') });
	}

	messageService.getMessages = function() {
		return $http.get(BASE_URL + '/messages').then(successHandle, function(response) {return errorHandle(response, 'Error getting list of messages') });
	}

	messageService.getMessageByID = function(id) {
		return $http.get(BASE_URL + '/messages/' + id).then(successHandle, function(response) {return errorHandle(response, 'Error getting message by ID') });
	}

	messageService.deleteMessageByID = function(id) {
		return $http.delete(BASE_URL + '/messages/' + id).then(successHandle, function(response) {return errorHandle(response, 'Error deleting message by ID') });
	}

	messageService.isPalindrome = function(id) {
		return $http.get(BASE_URL + '/messages/' + id + '/palindrome').then(successHandle, function(resposne) {return errorHandle(response, 'Error checking if message is palindrome') });
	}


	// Private functions
	function successHandle(response) {
		return response;
	}

	function errorHandle(response, error) {
		return $q.reject({ status: response.status, message: error });
	}

	return messageService;
}