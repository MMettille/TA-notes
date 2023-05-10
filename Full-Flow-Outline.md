Now that we've seen code examples of all the different parts, let's outline the steps we need to take to get our app to work.

**NOTE** - This is _one way_ you can get your code to work. There are many different ways to do it - your code may look different!

# Page Loads
1. The Page Loads
    - Here, we will load jQuery with `$(document).ready(readyNow);`, which will run the `readyNow` function.
    - Inside the `readyNow` function, we will:
        - Establish our clickListeners (this can be pulled out into its own function)
        - Run the function that contains our `GET` request  
    ```
    $(document).ready(readyNow);
    
    function readyNow(){
        // ⬇ Establish click listeners
        clickListeners();
        // ⬇ Run our get request:
        getAllEmployees();
        // ⬇
    } // end readyNow function
    ```
# Get Request

2. Get Request
    - Here, we will create a GET request with ajax, that will GET a list of all of our employees.
    ```
    function getAllEmployees(){
        // checking to see that the function is being called
        console.log('in getAllEmployees function');
        $.ajax({
            method: 'GET',
            url: '/employees'
        })
     ```
    - In our server.js, we will send the employee array back to the frontend.
    ```
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
    app.get('/employees', (req, res) => {
      res.send(allEmployees);
    })
    ```
    - Back in our client.js, we will capture the response in a `.then` and send that response to our `render` function 
    - If there was an error, we want to CATCH it, tell the user there was a problem, then `console.log` the error.
    ```
    function getAllEmployees(){
        // checking to see that the function is being called
        console.log('in getAllEmployees function');
        $.ajax({
            method: 'GET',
            url: '/employees'
        })
        // ⬇ We are starting here!
        .then((response) => {
        // Take the response from the backend and pass it to the render function
        renderStuff(response);
        }).catch((error) => {
            // Tell the user there was an issue
            alert('There was a problem. Please try again pater");
            // Log the issue
            console.log('error in getAllEmployees function', error);
        });
     ```
     - The next step is to render the stuff we got from the backend! This is fairly straightforward:
        - Empty the container the list of stuff will go into
        - Loop through the array of employees and inside that loop, append each employee to the DOM
     ```
      // ⬇ This will put things onto the DOM
      function renderStuff(arrayOfEmployeesToRender){
          // ⬇ This will empty the list container on the DOM
          $('#list').empty();
          // ⬇ Loop through the array of employees and append it to our list
          for (let employee of arrayOfEmployeesToRender){
              $('#list').append(`
                <li>
                  ${employee.name} is a ${employee.job_title} and makes ${employee.salary} a year.
                </li>
              `);
          }
       }
      ```
 # Post Request
 3. Post Request
    - A post request will start by a user making some kind of action - like typing in some inputs and clicking a submit button!
    - When the submit button is clicked, we will want a click listener that will run a `getUserInputs` function
    ```
    function readyNow(){
        // ⬇ Establish click listeners
        clickListeners();
        // ⬇ Run our get request:
        getAllEmployees();
        // ⬇
    } // end readyNow function
    
    function clickListeners(){
      // ⬇ When the submit button is clicked, run this function
      $("#submitBtn").on("click", getUserInputs);
    }
     ```
    - Inside the getUserInputs function, we will need to collect all of the user's input inside an object
    ```
    function getUserInputs() {
      // Checking to see if function is being called
      console.log("in getUserInputs function");
      // Targeting user's inputs with the DOM and creating an object
      let newEmployee = {
        name: $("#nameInput").val(), // The name of the employee
        job_title: $("#jobTitleInput").val(), // The job title of the employee
        salary: Number($("#salaryInput").val()) // The Salary of the employee
      }; // end object
    ```
    - Once we have that object, we can pass it as a parameter to a new function, `addNewEmployee`.
    ```
    function getUserInputs() {
      // Checking to see if function is being called
      console.log("in getUserInputs function");
      // Targeting user's inputs with the DOM and creating an object
      let newEmployee = {
        name: $("#nameInput").val(), // The name of the employee
        job_title: $("#jobTitleInput").val(), // The job title of the employee
        salary: Number($("#salaryInput").val()) // The Salary of the employee
      }; // end object
      // ⬇ Call the addNewEmployee function and pass it the employee we just created above.
      addNewEmployee(newEmployee);
    ```
    - Inside the addNewEmployee function, we will create a POST request with ajax.
    ```
    function addNewEmployee(newEmployee){
      // Checking to see if function is being called
      console.log('in addNewEmployee function')
      // ⬇ Post request
      $.ajax({
          method: 'POST',
          url: '/employees',
          data: newEmployee
      })
    ```
    - In our server.js, we will add the employee to the allEmployeesArray and send back a 'created' code to the user
    ```
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
    // *** POST REQUEST ***
    app.post('/employees', (req, res) => {
      // ⬇ Make sure that I can see the new employee on the server
      console.log('req.body is ...', req.body);
      // ⬇ Make req.body a variable
      let employee = req.body;
      // ⬇ Add the new employee to the allEmployees array
      allEmployees.push(employee)
      // ⬇ Send back a 'created' code to the user
      res.sendStatus(201);
    })
    ```
    - Back in our client.js, we will call the `GET` function that will go GET all of our employees (follow step #2 for a walk through of that!) and a second function that will clear all the inputs
    - If there was an error, we want to CATCH it, tell the user there was a problem, then `console.log` the error.
    ```
    function addNewEmployee(newEmployee){
    // Checking to see if function is being called
    console.log('in addNewEmployee function')
    $.ajax({
        method: 'POST',
        url: '/employees',
        data: newEmployee
    })
    // ⬇ We are starting here!
    .then( response => {
        // ⬇ If we posted sucessfully, call the function to make a GET request to get the up-to-date list of employees.
        getAllEmployees();
        // ⬇ Call the function to clear the inputs
        clearInputFields();
    }).catch( err => {
        // ⬇ Tell the user there was an issue
        alert('There was a problem adding your new employee. Please try again pater");
        // ⬇ Log the issue
        console.log('error in postNewEmployee function', error);
    });
    
    // ⬇ Clear the input fields
    function clearInputFields() {
      $("#nameInput").val("");
      $("#costInput").val("");
    }
    ```
     
     
     
     
     
