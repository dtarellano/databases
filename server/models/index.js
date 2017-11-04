var bluebird = require('bluebird');
var db = require('../db');


module.exports = {
  messages: {
    get: function () {
      return new Promise((resolve, reject) => {
        db.query('SELECT messages.id,users.name, rooms.roomname, messages.message FROM messages LEFT OUTER JOIN users ON messages.id_users = users.id LEFT JOIN rooms ON messages.id_rooms = rooms.id;', function(err, result) {
          if (err) {
            return reject(err);
          } else {
            resolve(result);
          }
        });
      }).then(result => {
        console.log(result);
        return result;
      });
    }, // a function which produces all the messages
    post: function (data) {
      return new Promise((resolve, reject) => {
        db.query('SELECT roomname FROM rooms', function(err, result) {
          if (err) { 
            return reject (err);
          } else {
            resolve(result);
          }
        });
      }).then(result => {
        if (result.length > 0) {
          var bool = false;
          result.forEach(function(value) {
            if (data.roomname === value.roomname) {
              bool = true;
            } 
          });  
          if (bool === false) {  
            var roomname = db.escape(data.roomname);
            var sql = 'INSERT INTO rooms (roomname) VALUES (' + roomname + ');';
            db.query(sql);
          }
        } else {
          var roomname = db.escape(data.roomname);
          var sql = 'INSERT INTO rooms (roomname) VALUES (' + roomname + ');';
          db.query(sql);
        }
  
      }).then( () => {
        console.log(data);
        var username = db.escape(data.username);
        var roomname = db.escape(data.roomname);
        var text = db.escape(data.text);
        db.query(`INSERT INTO messages (id_users, id_rooms, message) VALUES ((SELECT id FROM users WHERE name = ${username}), (SELECT id FROM rooms WHERE roomname = ${roomname}), ${text})`);
      });// a function which can be used to insert a message into the database
    }
  },

  users: {
    // Ditto as above.
    get: function () {
      db.query('SELECT name FROM users;', function(err, result) {
        if (err) {
          console.log('error');
        } else {
          return result;
        }
      });
    },
    post: function (data) {
      db.query('SELECT name FROM users', function(err, result) {
        if (result.length > 0) {
          var bool = false;
          result.forEach(function(value) {
            if (data.name === value.name) {
              bool = true;
            } 
          });  
          if (bool === false) {  
            var userID = db.escape(data.name);
            var sql = 'INSERT INTO users (name) VALUES (' + userID + ');';
            db.query(sql);
          }
        } else {
          var userID = db.escape(data.name);
          var sql = 'INSERT INTO users (name) VALUES (' + userID + ');';
          db.query(sql);
        }
  
      });
    }
  }
  
};

