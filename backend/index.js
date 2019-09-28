import express from "express";
require('dotenv').config()
import bodyParser from 'body-parser'
const passport = require('passport');
import Joi from "joi"
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser')
// create express app
const app = express();

// Add headers Middle Ware
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cookieParser());


app.use(passport.initialize());
require('./components/AppPassPort');

// Log requests to the console.
//app.use(logger('dev'));
//app.use(cors());
app.use(cors({origin: 'http://localhost:3000'}));

// CORS check for specific ORIGIN because we use Cookie
var allowedOrigins = ['http://localhost:3000',
                      'http://localhost:5000'];
// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin 
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));

// Require our routes into the application.
require('./controllers')(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}));

// listen for requests
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("PP Server is listening on port "+ port);
});
// const categories = [
//     {id: 1, name: "Cate 1"},
//     {id: 2, name: "Cate 2"},
//     {id: 4, name: "Cate 3"},
//     {id: 5, name: "Cate 4"}
// ]

// // define a simple route
// app.get('/', (req, res) => {
//     res.json({"message": "Welcome to PP"})
// });

// app.get('/api/categories', (req, res) => {
//     res.send(categories)
// })
// // :id/:name is also OK. -> /1/user
// // req.query {query: Value} ->  for :id/:name?query=Value
// app.get('/api/categories/:id', (req, res) => {
//     const cate = categories.find(c => c.id == req.params.id)
//     if (!cate) {
//         res.status(404).send("Cannot found Category")
//     }
//     res.send(cate)
// })

// app.post('/api/categories', (req, res) => {
//     if (validateCategory(req, res)) {
//         const cate = {
//             id: categories.length + 1,
//             name: req.body.name
//         }
//         categories.push(cate)

//         res.send(cate)
//     }
// })



// function validateCategory(req, res) {
//     const schema = {
//         name: Joi.string().min(3).required()
//     }
//     const validation = Joi.validate(req.body, schema)

//     if (validation.error) {
//         res.status(404).send(validation.error.details[0].message)
//         return false
//     }
//     return true
// }

