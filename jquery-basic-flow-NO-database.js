/*
    This describes the basic flow of taking data from a user and displaying it onto the dom.

    For the purposes of this exercise, let's say that someone is looking to make a grocery list.
        - There are two inputs:
            - A "Name" field
            - A "Cost" field
        - There is one submit button.
*/

// This should ALWAYS be step number one in a jquery project.
// We load the document and call the 'readyNow' function.
$(document).ready(readyNow);

function readyNow() {
  // jQuery and Javascript is loaded, it's now okay to manipulate the DOM
  console.log("in readyNow function");
  // When the submit button is clicked, run this function
  $("#submitBtn").on("click", getUserInputs);
}

// This is a global array
let groceryList = [];

// We will always start by first GETTING the user's input. This is a very basic function -> it's purpose is to get the data, then to direct you to more code.
function getUserInputs() {
  // Checking to see if function is being called
  console.log("in getUserInputs function");
  // targeting user's inputs with the DOM and creating an object
  let item = {
    name: $("#nameInput").val(), // The name of the thing we want to buy
    cost: Number($("#costInput").val()), // The cost of the the thing we want to buy, as a number
  }; // end item object
  // push item to an empty global array
  groceryList.push(item);
  // Call the display function
  displayThings();
  // Call the function to calculate the total
  calculateTotal();
  // Call the function to clear the inputs
  clearInputFields();
}

// Changing what happens on the DOM
function displayThings() {
  // Checking to see if function is being called
  console.log("in function displayThings");
  // First, we want to empty everything that is currently inside our DIV
  $(".myTable").empty();
  // Then we want to loop through the global array, add a table row for everything on our list.
  for (let item of groceryList) {
    // You do not need to save this in a variable. I do, just cause I think it reads a little nicer.
    let itemRow = $(`
        <tr class='AddRow'>
            <td>${item.name}</td>
            <td>${item.cost.toLocaleString("en-EN", {
              style: "currency",
              currency: "USD",
            })}</td>
        </tr>`);
    $(".addARow").append(itemRow);
  }
}

// function to check monthly salary
function calculateTotal() {
  // Checking to see if function is being called
  console.log("in function monthlyCalc");
  totalBill = 0;
  // for each item, add up all of the item's costs
  for (item of groceryList) {
    totalBill += item.cost;
  }
  // check to see if it logs correctly
  console.log(totalBill);
  // append the total to the DOM
  let whereToDisplayTotalCost = $(".displayTotalCost");
  // Empty what is currently there
  whereToDisplayTotalCost.empty();
  // Append
  whereToDisplayTotalCost.append(
    `<h3: ${totalSpend.toLocaleString("en-EN", {
      style: "currency",
      currency: "USD",
    })}</h3>`
  );
}

// clear the input fields
function clearInputFields() {
  $("#nameInput").val("");
  $("#costInput").val("");
}
