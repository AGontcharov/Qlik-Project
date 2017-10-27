(function() {
  'use strict';

  angular
    .module('app.auth')
    .factory('authentication', ['$cookies', '$location', 'session', authentication]);

  function authentication($cookies, $location, session) {

    var service = {
      createSession: createSession,
      refreshSession: refreshSession,
      isAuthenticated: isAuthenticated,
      logout: logout
    };

    return service;

    /**
     * Creates the user session and cookie
     * @param {Object} user - The user credentials
     */
    function createSession(user) {

      // Initialize cookie
      var cookie = {
        username: user.username,
        role: 'GUEST'
      };

      // Create user session
      $cookies.put('user', JSON.stringify(cookie));
      session.create(cookie.username, cookie.role);
      $location.path('/home');
    }

    /**
     * Refreshes the user session on route changes
     */
    function refreshSession() {

      // Get user cookie
      if ($cookies.get('user')) {
        var cookie = JSON.parse($cookies.get('user'));

        // Create new session
        session.create(cookie.username, cookie.role);
      }
    }

    /**
     * Checks if the user is authenticated
     */
    function isAuthenticated() {
      return !!session.user;
    };

    /**
     * Logs the user out and destroys the user session and cookie
     */
    function logout() {
      session.destroy();
      $cookies.remove('user');
      $location.path('/login');
    };
  }
})();