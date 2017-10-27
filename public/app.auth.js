(function() {
  'use strict';

  angular
    .module('app.auth', ['ngCookies'])
    .run(['$rootScope', '$location', 'authentication', run]);

  function run($rootScope, $location, authentication) {

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      authentication.refreshSession();

      // Allow navigation to register and login page without being authenticated
      if ($location.path() !== '/' && $location.path() !== '/login') {
          
          if (!authentication.isAuthenticated()) {
              event.preventDefault();
              $location.path('/login');
          }
      }
    });
  }
})();