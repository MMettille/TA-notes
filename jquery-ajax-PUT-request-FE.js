/*
    This describes the basic flow of making a PUT request to the backend.
    
    Reminder that this builds on top of both the GET and POST reqest flow. If you aren't familar with either, look at the notes from that first!
    
    For the purposes of this exercise, let's say that someone is looking add things to a reading list.
        - There are two inputs:
            - A "Name" field
            - A "Author" field
            - A "isRead" field
        - There is one submit button.
        - After you add something to your list, a delete button is added to that item.
*/

// This should ALWAYS be step number one in a jquery project.
// ⬇ We load the document and call the 'readyNow' function.
$(document).ready(readyNow);

function readyNow() {
  // ⬇ jQuery and Javascript is loaded, it's now okay to manipulate the DOM
  console.log("in readyNow function");
  // ⬇ When the submit button is clicked, run this function
  $("#submitBtn").on("click", getUserInputs);
  // ⬇ click listener for the delete button
  $( '#list' ).on('click', '#deleteBtn', deleteItem);
  // ⬇ click listener for the complete button
  $( '#list' ).on('click', '#checkbox', toggleIsRead);
  // ⬇ When we load the page, we automatically want to go GET data from the backend, so we have the most up to date information
  getHistory();
}

// ⬇ This function will edit the isRead status
function toggleIsRead(){
    // ⬇ This grabs the data-id of the item we would like to edit
    let itemId = $(this).closest('li').data('id');
    $.ajax({
        method: 'PUT',
        url: `reading-list/${itemId}`,
    }).then( response => {
        // ⬇ If we PUTTED sucessfully, call the function to make a GET request to get the up-to-date list of things.
        getHistory();
    }).catch( err => {
        console.log(`Error Editing Tasks. Please try again later.`);
    });
}

// Reminder -> The below code is for deleting an item.

// ⬇ This function will delete an item from the database
function deleteItem(){
    // ⬇ This grabs the data-id of the item we would like to delete
    let itemId = $(this).closest('li').data('id');
    $.ajax({
      method: 'DELETE',
      url: `reading-list/${itemId}`
    }).then( (response) => {
      // ⬇ If we deleted sucessfully, call the function to make a GET request to get the up-to-date list of things.
      refreshTasks();
    }).catch( (error) => {
      // ⬇ Inform the user that there was a problem.
      alert(`There was a problem deleting your task. Please try again later.`)
      // ⬇ Log the problem
      console.log(error)
    });
} // end deleteTask

// Reminder -> The below code is for the POST request. See how everything builds on top of each other?

// ⬇ We will always start by first GETTING the user's input. This is a very basic function -> it's purpose is to get the data, then to direct you to more code.
function getUserInputs() {
  // ⬇ Checking to see if function is being called
  console.log("in getUserInputs function");
  // ⬇ Targeting user's inputs with the DOM and creating an object
  let item = {
    name: $("#nameInput").val(), // The name of the book we want to read
    cost: $("#authorInput").val(), // The author of the book we want to read
    // On the backend, we will explicitly set `isRead` to false
  }; // end item object
  // ⬇ Call the postNewItem function and pass it the item we just created above.
  postNewItem(item);
}

function postNewItem(item){
    // ⬇ Sending the input to the server
    $.ajax({
        method: 'POST',
        url: '/reading-list',
        data: item
    }).then( response => {
        // ⬇ If we posted sucessfully, call the function to make a GET request to get the up-to-date list of things.
        getHistory();
        // ⬇ Call the function to clear the inputs
        clearInputFields();
    }).catch( err => {
        alert(`There was a problem adding your item. Please try again later.`);
    });
}

// ⬇ Clear the input fields
function clearInputFields() {
  $("#nameInput").val("");
  $("#costInput").val("");
}

// Reminder -> The code below builds the pattern for a GET request and includes the: 1) Get history function and 2) The render function.

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
          //! REALLY IMPORTANT! We will need to be able to target exactly which item we want to delete. 
          //! We are going to do that by placing an data-id on the list element itself, with our ID.
          <li data-id=${item.id}>
            ${item.name} by ${item.cost}
          </li>
          <label>Read?</label>
          <input id="checkbox" type="checkbox" checked={item.isRead}>
          <button id="deleteBtn">Delete</button>
        `);
    }
}
