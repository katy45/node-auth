var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
//var User   = require('./app/models/user.js'); // get our mongoose model

var AuthenticateUser = function(req, res) {
    // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {
      
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 60*60*24 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
}

module.exports = AuthenticateUser;