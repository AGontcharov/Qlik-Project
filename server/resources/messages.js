var db = require('../database.js')

module.exports = {

  postMessage: function(req, res, next) {
               
    var args = [res.locals.userID, req.body.subject, req.body.sender, req.body.content];
    db.query("INSERT INTO Messages (ID, Subject, Sender, Content) VALUES (?, ?, ?, ?)", args, function(err, rows, fields) {
      
      // HTTP 500 Internal
      if (err) throw err;
      // if (err) return res.status(500).send('Server error');

      // HTTP 201 Created
      return res.status(201).send('Message submitted');
    });
  },

  getMessages: function(req, res, next) {

    // db.query("SELECT MessageID, Subject, Content FROM Messages WHERE ID=?", res.locals.userID, function(err, rows, fields) {
    db.query("SELECT * FROM Messages", function(err, rows, fields) {
      
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

      // HTTP 200 Ok
      return res.status(200).send(rows);
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
  }
}

/*var query = "INSERT INTO Messages(id, subject, content)
               select id, (?,?) from Users  
               where username = (?)"*/