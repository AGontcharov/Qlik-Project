angular
  .module('qlik')
  .controller('navbar', ['$scope', 'authentication', navbar]); 

function navbar($scope, authentication) {

    /**
     * Logs the user out
     */
  $scope.logout = function() {
    authentication.logout();
  }
}