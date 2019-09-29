import AppUtil from '../components/AppUtil'

const DBRoles = require('../server/models').DBRoles;
const DBUsers = require('../server/models').DBUsers;
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

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
    },
    registerFacebookLogin(req, res, next) {
      console.log("auth:registerFacebookLogin")
      console.log(req.body)
      let userId = req.body.userId;
      
      // First check if this User Id Exist
      DBUsers
        .findOne({
            where: {
                'userId': userId
            }
        })
        .then(result => {
            // Generate random CSRF TOKEN
            let csrf = uuidv4();
            if (result) {
                // User Existed, need Update information
                console.log("Facebook User already Exist, Will Update entire information")
                return result.update(req.body)
                  .then(retuser => {
                    let user = AppUtil.createUserFromRecordForJWT(retuser)
                    user.csrf = csrf;
                    // generate a signed son web token with the contents of user object and return it in the response
                    const jwttoken = jwt.sign(user, 'your_jwt_secret', { expiresIn: '30d' });
                    console.log("        UPDATED FB User, jwttoken:" + jwttoken)
                    return res
                      .status(200)
                      .cookie('jwt',jwttoken, { maxAge: 9000000, httpOnly: true, path:"/" })
                      .send({user, csrf})
                  })
                  .catch(error => res.status(400).send(error));
            } else {
                // User not Exist, will create
                return DBUsers
                  .create(req.body)
                  .then(retuser => {
                    let user = AppUtil.createUserFromRecordForJWT(retuser)
                    user.csrf = csrf;
                    // generate a signed son web token with the contents of user object and return it in the response
                    const jwttoken = jwt.sign(user, 'your_jwt_secret', { expiresIn: '30d' });
                    console.log("      User Add FB User, jwttoken:" + jwttoken)
                    return res
                      .status(200)
                      .cookie('jwt',jwttoken, { maxAge: 9000000, httpOnly: true, path:"/" })
                      .send({user, csrf})
                  })
                  .catch(error => res.status(400).send(error));
            }
        })
        .catch(error => {
            // something wrong in DB
            res.status(501).send({error: "Something Wrong in DB"});
        });
    },
    registerGoogleLogin(req, res, next) {
      console.log("auth:registerGoogleLogin")
      console.log(req.body)
      let userId = req.body.userId;
      
      // First check if this User Id Exist
      DBUsers
        .findOne({
            where: {
                'userId': userId
            }
        })
        .then(result => {
            // Generate random CSRF TOKEN
            let csrf = uuidv4();
            if (result) {
                // User Existed, need Update information
                console.log("Google User already Exist, Will Update entire information")
                return result.update(req.body)
                  .then(retuser => {
                    let user = AppUtil.createUserFromRecordForJWT(retuser)
                    user.csrf = csrf;
                    // generate a signed son web token with the contents of user object and return it in the response
                    const jwttoken = jwt.sign(user, 'your_jwt_secret', { expiresIn: '30d' });
                    console.log("        UPDATED Google User, jwttoken:" + jwttoken)
                    return res
                      .status(200)
                      .cookie('jwt',jwttoken, { maxAge: 9000000, httpOnly: true, path:"/" })
                      .send({user, csrf})
                  })
                  .catch(error => res.status(400).send(error));
            } else {
                // User not Exist, will create
                return DBUsers
                  .create(req.body)
                  .then(retuser => {
                    let user = AppUtil.createUserFromRecordForJWT(retuser)
                    user.csrf = csrf;
                    // generate a signed son web token with the contents of user object and return it in the response
                    const jwttoken = jwt.sign(user, 'your_jwt_secret', { expiresIn: '30d' });
                    console.log("      User Add Google User, jwttoken:" + jwttoken)
                    return res
                      .status(200)
                      .cookie('jwt',jwttoken, { maxAge: 9000000, httpOnly: true, path:"/" })
                      .send({user, csrf})
                  })
                  .catch(error => res.status(400).send(error));
            }
        })
        .catch(error => {
            // something wrong in DB
            res.status(501).send({error: "Something Wrong in DB"});
        });
    }
}
