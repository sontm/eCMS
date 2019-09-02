import express from "express";
require('dotenv').config()
import bodyParser from 'body-parser'
import Joi from "joi"
const cors = require('cors');
const logger = require('morgan');

// create express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// Log requests to the console.
//app.use(logger('dev'));
app.use(cors());

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

