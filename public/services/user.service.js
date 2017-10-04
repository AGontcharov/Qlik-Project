angular
	.module('qlik')
	.factory('userService', ['$http', '$q', userService]); 

function userService($http, $q) {

	var BASE_URL = '/api';

	var service = {
		createUser: createUser,
		authenticate: authenticate,
		getUsers: getUsers
	};

	return service;

	// User endpoints
	function createUser(user) {
		return $http.post(BASE_URL + '/users', user).then(successHandle, function(response) { return errorHandle(response, 'Error creating user') });
	}

	function authenticate(user) {
		return $http.post(BASE_URL + '/users/login', user).then(successHandle, function(response) {return errorHandle(response, 'Error authenticating user') });
	}	

	function getUsers() {
		return $http.get(BASE_URL + '/users').then(successHandle, function(response) {return errorHandle(response, 'Error getting list of users') });
	}


	// Private functions
	function successHandle(response) {
		return response;
	}

	function errorHandle(response, error) {
		return $q.reject({ status: response.status, message: error });
	}
}