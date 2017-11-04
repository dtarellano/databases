var models = require('../models');
var qs = require('querystring');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function (req, res) {
      // return new Promise((resolve, reject) => {
      //   var messages = models.messages.get();
      //   req.onload = function
      // }).then(response => {
      //   console.log(response);
      // });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var data = '';
      req.on('data', function(chunk) {
        data = data += chunk;
        console.log(data);
      });
      req.on('end', function() {
        models.messages.post(qs.parse(data));
      });
    } // a function which handles posting a message to the database
  },
  users: {
    // Ditto as above
    get: function (req, res) {
      var users = models.users.get();
      res.end(users);
    },
    post: function (req, res) {
      var data = '';
      req.on('data', function(chunk) {
        data = data += chunk;
      });
      req.on('end', function() {
        models.users.post(qs.parse(data));
      });
    }
  }
};

