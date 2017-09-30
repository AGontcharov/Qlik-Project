angular
	.module('qlik')
	.factory('userService', ['$http', '$q', function($http, $q) {

	var userService = {};
	var BASE_URL = '/api';

	// User endpoints
	userService.createUser = function(user) {
		return $http.post(BASE_URL + '/users', user).then(successHandle, function() { return errorHandle('Error creating user') });
	}

	userService.getUsers = function() {
		return $http.get(BASE_URL + '/users').then(successHandle, function() {return errorHandle('Error getting list of Users') });
	}


	// Private functions
	function successHandle(response) {
		return response;
	}

	function errorHandle(error) {
		return $q.reject(error);
	}

	return userService;
}])