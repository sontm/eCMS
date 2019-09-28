const DBRoles = require('../server/models').DBRoles;
const DBUsers = require('../server/models').DBUsers;
const bcrypt = require('bcrypt')

module.exports = {
    createRole(req, res) {
      return DBRoles
        .create(req.body)
        .then(result => {
          res.status(201).send(result)
        })
        .catch(error => res.status(400).send(error));
    },
    getAllRoles(req, res) {
      console.log(req.body);
      return DBRoles
          .findAll()
          .then(result => res.status(200).send(result))
          .catch(error => res.status(400).send(error));
    },
    registerUser(req, res) {
      let rawPwd = req.body.password;
      console.log("Register user, Raw:" + rawPwd)
      bcrypt.hash(rawPwd, 10, (err, hash) => {
        if(err) throw err;
        let newPwd = hash;
        console.log("  Register user, NewRaw:" + newPwd)
        let userInfo = req.body;
        userInfo.password = newPwd;
        userInfo.passwordRaw = rawPwd;

        return DBUsers
          .create(userInfo)
          .then(result => {
            res.status(201).send(result)
          })
          .catch(error => res.status(400).send(error));
      });
    },
    getAllUsers(req, res) {
      console.log(req.body);
      return DBUsers
          .findAll()
          .then(result => res.status(200).send(result))
          .catch(error => res.status(400).send(error));
    },
    getUserProfile(req, res) {
        console.log("    User, getUserProfile called, req.user")
        console.log(req.user)
        res.send(req.user);
    }
}