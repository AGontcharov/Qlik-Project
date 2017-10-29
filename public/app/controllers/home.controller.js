(function() {
  'use strict';

  angular
    .module('qlik')
    .controller('home', ['$scope', 'session', 'messageService', home]);

  function home($scope, session, messageService) {

    // Initialize the controller
    activate();

    /**
     * Submits the message form
     */
    $scope.submit = function() {
      $scope.message.username = session.user;

      messageService.createMessage($scope.message)
      .then(function(response) {
        
        // Clear message form
        $scope.message.subject = '';
        $scope.message.content = '';
        activate();
      })
      .catch(function(error) {
        console.log(error);
      });
    };

    /**
     * Toggles between viewing messages
     * @param {Object} message - The message instance
     */
    $scope.selectedMessage = function(message) {
      message.selected  = message.selected ? false : true;
    };

    /**
     * Deletes the selected message
     * @param {Number} id - The Message ID
     */
    $scope.deleteMessage = function(id) {

      messageService.deleteMessageByID(id)
      .then(function(response) {
        activate();
      })
      .catch(function(error) {
        console.log(error);
      });
    };

    /**
     * Checks if the selected message content is a palidrome
     * @param {Object} message - The Message instance
     */
    $scope.isPalindrome = function(message) {
      
      // Prevent message contents from closing
      message.selected = false;

      messageService.isPalindrome(message.MessageID)
      .then(function(response) {
        message.palindrome = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    };
    
    /**
     * Private function used to initializes the controller after every request
     */
    function activate() {
      messageService.getMessages()
      .then(function(response) {
        $scope.newsfeed = true;
        $scope.messages = response.data;
      })
      .catch(function(error) {
        console.log(error);
        $scope.newsfeed = false;
      });
    }
  }
})();