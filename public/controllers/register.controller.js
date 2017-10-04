angular
  .module('qlik')
  .controller('register', ['$scope', 'authentication', 'userService', register]); 

function register($scope, authentication, userService) {

  /**
   * Submits the register form and authenticates user account
   */
  $scope.submit = function() {

    // Prevent submitting invalid forms
    if ($scope.registerForm.$invalid) return;

    userService.createUser($scope.account).then(function(response) {
      authentication.createSession($scope.account);
    })
    .catch(function(error) {
      console.log(error);
      $scope.error = true;
    });
  }
}