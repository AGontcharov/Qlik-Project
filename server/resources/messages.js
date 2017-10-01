var db = require('../database.js')

module.exports = {

  postMessage: function(req, res, next) {
               
    var args = [res.locals.userID, req.body.subject, req.body.content];
    db.query("INSERT INTO Messages (ID, Subject, Content) VALUES (?, ?, ?)", args, function(err, rows, fields) {
      
      // HTTP 500 Internal
      if (err) throw err;
      // if (err) return res.status(500).send('Server error');

      // HTTP 201 Created
      return res.status(201).send('Message submitted');
    });
  },

  getMessages: function(req, res, next) {

    db.query("SELECT * FROM Messages INNER JOIN Users on Messages.ID = Users.ID ORDER BY MessageID", function(err, rows, fields) {
      
      // HTTP 500 Internal
      if (err) throw err;
      // if (err) return res.status(500).send('Server error');

      // HTTP 404 Not Found
      if (!rows.length) return res.status(404).send('Messages not found');

      // HTTP 200 Okay
      return res.status(200).send(rows);
    });
  },

  getMessageByID: function(req, res, next) {

    db.query("SELECT MessageID, Subject, Content FROM Messages WHERE MessageID=?", req.params.messageID, function(err, rows, fields) {

      // HTTP 500 Internal
      if (err) throw err;
      // if (err) return res.status(500).send('Server error');

      // HTTP 404 Not Found
      if (!rows.length) return res.status(404).send('Message not found');

      // Check if palindrome action has been called on the message
      if (req.route.path === '/messages/:messageID/palindrome') {
        res.locals.palindrome = rows[0].Content;
        next();
      }

      // HTTP 200 Ok
      else return res.status(200).send(rows);
    });
  },

  deleteMessageByID: function(req, res, next) {
    
    // Logic to check if message exists. Does it matter?

    db.query("DELETE From Messages WHERE MessageID=?", req.params.messageID, function(err, rows, fields) {

      // HTTP 500 Internal
      if (err) throw err;
      // if (err) return res.status(500).send('Server error');

      console.log('len', rows.length);

      // HTTP 204 Deleted
      return res.status(204).send('Message delete');
    });
  },

  isPalindrome: function(req, res, next) {
    console.log('Validating palindrome: ', res.locals.palindrome);

    // Prevent case insensitive comparison
    var palindrome = res.locals.palindrome.toUpperCase();
    var strlen = palindrome.length - 1;

    // Iterate over the string
    for (i = 0; i < palindrome.length; i++) {
      
      // Post decrement strlen after comparison
      if (palindrome[i] !== palindrome[strlen--]) {

        // HTTP 200k Ok False
        return res.status(200).send(false);
      }
    }

    // HTTP 200 Ok True
    return res.status(200).send(true);
  }
}

/*var query = "INSERT INTO Messages(id, subject, content)
               select id, (?,?) from Users  
               where username = (?)"*/