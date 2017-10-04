angular
	.module('qlik')
	.factory('messageService', ['$http', '$q', messageService]);

function messageService($http, $q) {

	var BASE_URL = '/api';

	var service = {
		createMessage: createMessage,
		getMessages: getMessages,
		getMessageByID: getMessageByID,
		deleteMessageByID: deleteMessageByID,
		isPalindrome: isPalindrome
	};

	return service;

	// Messages endpoints
	function createMessage(message) {
		return $http.post(BASE_URL + '/messages', message).then(successHandle, function(response) { return errorHandle(response, 'Error posting message') });
	}

	function getMessages() {
		return $http.get(BASE_URL + '/messages').then(successHandle, function(response) {return errorHandle(response, 'Error getting list of messages') });
	}

	function getMessageByID(id) {
		return $http.get(BASE_URL + '/messages/' + id).then(successHandle, function(response) {return errorHandle(response, 'Error getting message by ID') });
	}

	function deleteMessageByID(id) {
		return $http.delete(BASE_URL + '/messages/' + id).then(successHandle, function(response) {return errorHandle(response, 'Error deleting message by ID') });
	}

	function isPalindrome(id) {
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