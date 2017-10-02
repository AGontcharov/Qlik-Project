angular
    .module('app.auth', ['ngCookies'])
    .run(['$rootScope', '$location', 'authentication', run]);

function run($rootScope, $location, authentication) {

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        authentication.refreshSession();

        if ($location.path() !== '/' && $location.path() !== '/login') {
            
            if (!authentication.isAuthenticated()) {
                console.log('DENY : Redirecting to login page');
                event.preventDefault();
                $location.path('/login');
            }
        }
    });
}