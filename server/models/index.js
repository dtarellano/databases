var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      db.query('SELECT * FROM messages;', function(err, result) {
        if (err) {
          console.log('error');
        } else {
          console.log(result[0]);
          console.log(result[0].message);
          return result;
        }
      });
    }, // a function which produces all the messages
    post: function (data) {
      console.log(data);
      db.query(`INSERT INTO rooms (roomname) VALUES ("${data.roomname}")`);
      db.query(`INSERT INTO messages (id_users, id_rooms, message) VALUES ((SELECT id FROM users WHERE name = "${data.username}"), (SELECT id FROM rooms WHERE roomname = "${data.roomname}"), "${data.text}")`);
    } // a function which can be used to insert a message into the database
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
      console.log(data);
      db.query('SELECT name FROM users', function(err, result) {
        console.log(result);
        if (result.length > 0) {
          result.forEach(function(value) {
            console.log(value);
            if (data.username === value.name) {
              console.log('yiiiissss');
              return;
            } else {
              console.log(data.username);
              db.query(`INSERT INTO users (name) VALUES ("${data.username}");`);
            }
          });
        } else {
          db.query(`INSERT INTO users (name) VALUES ("${data.username}");`);
        }
      });
    }
  }
};

