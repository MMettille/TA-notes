/*
    This describes the basic flow of making a GET request to the backend, then rendering what is returned.
    
    This pattern is ESSENTIAL to full stack development. Follow this pattern EVERYTIME you are making a new getRequest!

    For this exersise, let's imagine that the response we are getting back from the database looks like:
    [ 
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
*/

// This should ALWAYS be step number one in a jquery project.
// ⬇ We load the document and call the 'readyNow' function.
$(document).ready(readyNow);

function readyNow() {
  // ⬇ jQuery and Javascript is loaded, it's now okay to manipulate the DOM
  console.log("in readyNow function");
  // Any click listeners can go here.
  
  // ⬇ When we load the page, we automatically want to go GET data from the backend, so we have the most up to date information
  getAllEmployees();
}

function getAllEmployees(){
    // ⬇ checking to see that the function is being called
    console.log('in getAllEmployees function');
    $.ajax({
        method: 'GET',
        url: '/employees'
    }).then((response) => {
        // ⬇ Take the response from the database and pass it to the render function
        // Important note -> We are going to assume that the response from the database is an array. You can see that array at the top of this file.
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
