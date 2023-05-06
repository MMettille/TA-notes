/*
    This describes the basic flow of making a GET request to the backend, then rendering what is returned.
    
    This pattern is ESSENTIAL to full stack development. Follow this pattern EVERYTIME you are making a new getRequest!

    For this exersise, let's imagine that the response we are getting back from the database looks like:
    [ 
       {
          id: 1
          name: "Oranges",
          cost: "0.99",
       },
       {
          id: 2
          name: "Apples",
          cost: "1.99",
       }
    ]
*/

// This should ALWAYS be step number one in a jquery project.
// ⬇ We load the document and call the 'readyNow' function.
$(document).ready(readyNow);

function readyNow() {
  // ⬇ jQuery and Javascript is loaded, it's now okay to manipulate the DOM
  console.log("in readyNow function");
  // Any click listeners can go here.
  
  // ⬇ When we load the page, we automatically want to go GET data from the backend, so we have the most up to date information
  getHistory();
}

function getHistory(){
    // ⬇ checking to see that the function is being called
    console.log('in getHistory function');
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then((response) => {
        // ⬇ Take the response from the database and pass it to the render function
        // Important note -> We are going to assume that the response from the database is an array.
        renderStuff(response);
    }).catch((error) => {
        alert('error in getHistory function');
    });
} // end getHistory function

// ⬇ This will put things onto the DOM
function renderStuff(arrayOfStuffToRender){
    // ⬇ This will empty the list container on the DOM
    $('#list').empty();
    // ⬇ Loop through the array of stuff and append it to our list
    for (let item of arrayOfStuffToRender){
        $('#list').append(`
          <li>
            ${item.name} costs ${item.cost}
          </li>
        `);
    }
}
