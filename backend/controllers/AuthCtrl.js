const jwt = require('jsonwebtoken');
const passport = require('passport');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt')

require('dotenv').config()

// 1 If username and password are correct, proceed with the following listing.
// 2 Create a new JWT and include a generated CSRF token in the payload as a claim, 
//     then sign the JWT.
// 3 Respond to client's authentication request by setting an HTTPOnly cookie which 
//     contains the JWT. This ensures that only the browser (not the client side app 
//     and possibly malicious scripts) has access to the JWT. It's also a good idea to 
//     set the cookie to secure. This prevents the browser from sending the cookie if 
//     an unsecured communication channel is used (i.e. not https).
// 4 When setting the JWT cookie, you should also set an HTTP header which will also contain 
//     your generated CSRF token. Note that now you will have the CSRF token in to places—inside 
//     the JWT cookie and in an HTTP header.
// 5 In your client app, store the CSRF token from the header into localstorage.
// 6 For each request, take the CSRF token from localstorage and include it as a request 
//     header (the cookie containing the JWT is passed along automatically by the browser).
// 7 The server should read the JWT from the cookie, validate its signature and read the CSRF 
//     token from the JWT's payload. Then it should compare it against the CSRF token that's 
//     in the request header. If they match, the server can continue processing the request.
module.exports = {
    login(req, res, next) {
        console.log("Auth, Login called:")
        // Not use session, use JWT
        passport.authenticate('local', {session: false}, (err, user, info) => {
            console.log("  Auth, Login:")
            if (err || !user) {
                console.log("    Auth, Login Failed, err:")
                console.log(user)
                return res.status(400).json({
                    message: 'Something is not right',
                    user   : user
                });
            }
            
            // Auth OK
            req.login(user, {session: false}, (err) => {
                console.log('Cookies: ', req.cookies)
                if (err) {
                    console.log("      Auth, ReqLogin failed:")
                    res.send(err);
                }
                console.log("      Auth, ReqLogin OK, UserInfo:")
                // Generate random CSRF TOKEN
                let csrf = uuidv4();
                user.csrf = csrf;
                      
                console.log(user)
                // generate a signed son web token with the contents of user object and return it in the response
                const jwttoken = jwt.sign(user, 'your_jwt_secret', { expiresIn: '30d' });
                console.log("      Auth, ReqLogin OK, jwttoken:" + jwttoken)
                // maxAge is Milisecond
                return res
                    .status(200)
                    .cookie('jwt',jwttoken, { maxAge: process.env.MAX_AGE_LOGIN_COOKIE_ms, httpOnly: true, path:"/" })
                    .send({user, csrf})
                //return res.json({user, token});
            });
        })(req, res);
    }

}