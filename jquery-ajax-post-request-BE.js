/*
    This file demonstrates what you will see on the backend of a POST request.
    
    For this exersise, let's imagine we are rebuilding your first weekend project (the bonus salary calculator) as a fullstack app.
*/

// Each of these lines is important for setting up your server. You will need EVERY ONE, EVERY TIME you make a new server//start a new project. Don't forget the `app.listen` at the bottom of this file!
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended : true}));

// The code in between these lines will eventually be in their own route file!
// ---------------------------------------------------------------------------
// this is an array of employees
let allEmployees = [ 
       {
          id: 1
          name: "Mary",
          job_title: "Software Engineer II",
          salary: 110_000
       },
       {
          id: 2
          name: "Jenna",
          job_title: "Designer",
          salary: 98_000
       },
       {
          id: 3
          name: "Marcus",
          job_title: "Product Manager",
          salary: 70_000
       },
    ]; 

// *** GET REQUEST ***
// This will send the employee array back to the frontend.
app.get('/employees', (req, res) => {
    res.send(allEmployees);
})

// *** POST REQUEST ***
// This will add a new employee to our allEmployees array
app.post('/employees', (req, res) => {
    // ⬇ First, I want to make sure that I can see my new employee on the server
    console.log('req.body is ...', req.body);
    // ⬇ Make req.body a variable
    let employee = req.body;
    // ⬇ Add the new employee to the allEmployees array
    allEmployees.push(employee)
    // ⬇ Send back a 'created' code to the user
    res.sendStatus(201);
})

// ---------------------------------------------------------------------------

// tell the server to listen for connections
app.listen(PORT, () => {
    console.log( 'RUNNING ON PORT', PORT )
})
