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

  /**
   * Private function for handling request success
   * @param {Object} response - The response object
   * @return {Object} response - The response object
   */
  function successHandle(response) {
    return response;
  }

  /**
   * Private function for handling request error
   * @param {Object} response - The response object
   * @error {String} error - The error message
   * @return {Object} response - The response object
   */
  function errorHandle(response, error) {
    return $q.reject({ status: response.status, message: error });
  }
}