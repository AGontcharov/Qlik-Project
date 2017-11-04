'use strict';

module.exports = function(palindrome) {

  // Allow case insentive strings
  palindrome = palindrome.toUpperCase().replace(/ /g, '');
  var length = palindrome.length - 1;

  // Iterate over the string
  for (var i = 0; i < palindrome.length; i++) {
    
    // Post decrement length after comparison
    if (palindrome[i] !== palindrome[length--]) return false;
  }
  return true;
};