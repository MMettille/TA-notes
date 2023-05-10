/*
    This describes the basic flow of making a POST request to the backend.
    
    Reminder that this builds on top of the GET reqest flow. If you aren't familar with that, look at the notes from that first!
    
    This pattern is ESSENTIAL to full stack development. Follow this pattern EVERYTIME you are making a new post request!
    
    For this exersise, let's imagine we are rebuilding your first weekend project (the bonus salary calculator) as a fullstack app.
        - There are two inputs:
            - A "Name" field
            - A "Job Title" field
            - A "Salary" field
        - There is one submit button.
*/

// This should ALWAYS be step number one in a jquery project.
// ⬇ We load the document and call the 'readyNow' function.
$(document).ready(readyNow);

function readyNow() {
  // ⬇ jQuery and Javascript is loaded, it's now okay to manipulate the DOM
  console.log("in readyNow function");
  // ⬇ When the submit button is clicked, run this function
  $("#submitBtn").on("click", getUserInputs);
  // ⬇ When we load the page, we automatically want to go GET data from the backend, so we have the most up to date information
  getAllEmployees();
}

// ⬇ We will always start by first GETTING the user's input. This is a very basic function -> it's purpose is to get the data, then to direct you to more code.
function getUserInputs() {
  // ⬇ Checking to see if function is being called
  console.log("in getUserInputs function");
  // ⬇ Targeting user's inputs with the DOM and creating an object
  let newEmployee = {
    name: $("#nameInput").val(), // The name of the employee
    job_title: $("#jobTitleInput").val(), // The job title of the employee
    salary: Number($("#salaryInput").val()) // The Salary of the employee
  }; // end item object
  // ⬇ Call the addNewEmployee function and pass it the employee we just created above.
  addNewEmployee(newEmployee);
}

function addNewEmployee(newEmployee){
    // ⬇ Sending the input to the server
    $.ajax({
        method: 'POST',
        url: '/employees',
        data: newEmployee
    }).then( response => {
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
}

// ⬇ Clear the input fields
function clearInputFields() {
  $("#nameInput").val("");
  $("#costInput").val("");
}

// Reminder -> The code below builds the pattern for a GET request and includes the: 1) getAllEmployees function and 2) The render function.

function getAllEmployees(){
    // ⬇ checking to see that the function is being called
    console.log('in getHistory function');
    $.ajax({
        method: 'GET',
        url: '/employees'
    }).then((response) => {
        // ⬇ Take the response from the database and pass it to the render function
        // Important note -> We are going to assume that the response from the database is an array.
        renderStuff(response);
    }).catch((error) => {
        // ⬇ Tell the user there was an issue
        alert('There was a problem. Please try again pater");
        // ⬇ Log the issue
        console.log('error in getAllEmployees function', error);
    });
} // end getAllEmployees function

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
