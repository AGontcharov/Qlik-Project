angular
	.module('qlik')
	.factory('userService', ['$http', '$q', userService]); 

function userService($http, $q) {

	var userService = {};
	var BASE_URL = '/api';

	// User endpoints
	userService.createUser = function(user) {
		return $http.post(BASE_URL + '/users', user).then(successHandle, function(response) { return errorHandle(response, 'Error creating user') });
	}

	userService.authenticate = function(user) {
		return $http.post(BASE_URL + '/users/login', user).then(successHandle, function(response) {return errorHandle(response, 'Error authenticating user') });
	}	

	userService.getUsers = function() {
		return $http.get(BASE_URL + '/users').then(successHandle, function(response) {return errorHandle(response, 'Error getting list of users') });
	}


	// Private functions
	function successHandle(response) {
		return response;
	}

	function errorHandle(response, error) {
		return $q.reject({ status: response.status, message: error });
	}

	return userService;
}