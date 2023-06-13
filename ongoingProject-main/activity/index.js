const employees = []; // Array to store employee objects

// ...
const resetButton = document.getElementById("add1");
resetButton.addEventListener("click", function(event) {
  event.preventDefault();
  resetForm();
});

const editButton = document.getElementById("edit");
editButton.addEventListener("click", function(event) {
  event.preventDefault();
  editClicked();
});



const addButton = document.getElementById("add");
addButton.addEventListener("click", (e) => {
  e.preventDefault();

  var employeeID = document.getElementById("employeeID").value;
  var employeeName = document.getElementById("employeeName").value;
  var employeeAge = document.getElementById("employeeAge").value;
  var employeeGender = document.getElementById("employeeGender").value;
  var errorMessage = document.getElementsByClassName("errorMessage");

  // for (var i = 0; i < errorMessage.length; i++) {
  //   errorMessage[i].innerHTML = "";
  // }
  var regex=/^(0*[1-9]\d*)$/;

  if (employeeID === "") {
    errorMessage[0].innerHTML = "Employee ID is required";
    return false;
  }

  if(!regex.test(employeeID)){
    errorMessage[0].innerHTML = "Employee ID must be a number ";
    return false;
  }


  if (employeeName === "") {
    errorMessage[1].innerHTML = "Enter a valid Name";
    return false;
  }
  
  var nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  if (!nameRegex.test(employeeName)) {
    errorMessage[1].innerHTML = "Enter a valid Name";
    return false;
  }
  
  if (employeeAge === "" || isNaN(employeeAge) || employeeAge < 18 || employeeAge > 65) {
    errorMessage[2].innerHTML = "Age must be between 18 and 65";
    return false;
  }

  if (employeeGender === "") {
    errorMessage[3].innerHTML = "Gender is required";
    return false;
  }

  function readFormData() {
    var formData = {};
    formData["employeeID"] = employeeID;
    formData["employeeName"] = employeeName;
    formData["employeeAge"] = employeeAge;
    formData["employeeGender"] = employeeGender;
    return formData;
  }

  var formData = readFormData();
  insertNewRecord(formData, errorMessage);
  resetForm();
});


//<-------------------------------------------------RESET THE FORM ------------------------------------------------------------------------->
function resetForm(formData) {
  document.getElementById("employeeID").value = "";
  document.getElementById("employeeName").value = "";
  document.getElementById("employeeAge").value = "";
  document.getElementById("employeeGender").value = "";

  var errorMessages = document.getElementsByClassName("errorMessage");
  for (var i = 0; i < errorMessages.length; i++) {
    errorMessages[i].textContent = "";
  }
}


// <--------------------------------------------------Insert the data----------------------------------------------------------------------->
function insertNewRecord(data) {

  var employee = {
    employeeID: data.employeeID,
    employeeName: data.employeeName,
    employeeAge: data.employeeAge,
    employeeGender: data.employeeGender
  };


  var existingEmployee = employees.some(function(employee) {
    return employee.employeeID === data.employeeID;
  });


  if (existingEmployee) {
    // existingEmployee.employeeName = data.employeeName;
    // existingEmployee.employeeAge = data.employeeAge;
    // existingEmployee.employeeGender = data.employeeGender;
    return false;

  } else {
    // var employee = {
    //   employeeID: data.employeeID,
    //   employeeName: data.employeeName,
    //   employeeAge: data.employeeAge,
    //   employeeGender: data.employeeGender
    // };
    employees.push(employee); // Add employee object to the array
  }

  employees.sort(function(a, b) {
    return a.employeeID - b.employeeID;
  });

  console.log(employees);

  updateTable();


  
    
  // var table = document.getElementById("employeeTable");
  // var tbody = table.getElementsByTagName("tbody")[0];
  // var newRow = tbody.insertRow(tbody.length);
  // var cell1 = newRow.insertCell(0);
  // cell1.innerHTML = data.employeeID;
  // var cell2 = newRow.insertCell(1);
  // cell2.innerHTML = data.employeeName;
  // var cell3 = newRow.insertCell(2);
  // cell3.innerHTML = data.employeeAge;
  // var cell4 = newRow.insertCell(3);
  // cell4.innerHTML = data.employeeGender;
  // var cell5 = newRow.insertCell(4);
  // cell5.innerHTML = `<button class="edit" onclick="onEdit(this)">Edit</button> <button class="delete" onclick="onDelete(this)">Delete</button>`;

  
}

//<---------------------------------------------------Update the table---------------------------------------------------------------------->
function updateTable() {
  var table = document.getElementById("employeeTable");
  var tbody = table.getElementsByTagName("tbody")[0];

  tbody.innerHTML = "";

  employees.forEach(function(emp) {

    var newRow = tbody.insertRow(-1); // Insert new row after table headers

    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = emp.employeeID;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = emp.employeeName;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = emp.employeeAge;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = emp.employeeGender;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button class="edit" onclick="onEdit(this) ">Edit</button> <button class="delete" onclick="onDelete(this)">Delete</button>`;

    
  employees.sort(function (a, b) {
    return a.employeeID - b.employeeID;
  });

  });
}


// Update the data
function onEdit(button) {
  // Hide the "ADD" button
  document.getElementById("add").style.display = "none";

  // Display the "Edit" button
  document.getElementById("edit").style.display = "block";

  var row = button.closest("tr");
  var cells = row.cells;
  var employeeID = cells[0].innerHTML;
  var employeeName = cells[1].innerHTML;
  var employeeAge = cells[2].innerHTML;
  var employeeGender = cells[3].innerHTML;

  // Set the values in the form for editing
  document.getElementById("employeeID").value = employeeID;
  document.getElementById("employeeName").value = employeeName;
  document.getElementById("employeeAge").value = employeeAge;
  document.getElementById("employeeGender").value = employeeGender;


}
function editClicked() {
  console.log("Edit ke Andar");
  var employeeID = document.getElementById("employeeID").value;
  var employeeName = document.getElementById("employeeName").value;
  var employeeAge = document.getElementById("employeeAge").value;
  var employeeGender = document.getElementById("employeeGender").value;

  // Update the table cell values for the corresponding row
  var table = document.getElementById("employeeTable");
  var tbody = table.getElementsByTagName("tbody")[0];
  var rowIndex = Array.from(tbody.rows).findIndex(function(row) {
    return row.cells[0].innerHTML === employeeID;
  });
  var row = tbody.rows[rowIndex];
  var cells = row.cells;

  // Update the cell values with the edited data
  cells[0].innerHTML = employeeID;
  cells[1].innerHTML = employeeName;
  cells[2].innerHTML = employeeAge;
  cells[3].innerHTML = employeeGender;

  employees.sort(function (a, b) {
    return a.employeeID - b.employeeID;
  });
}


// Delete the data
function onDelete(td) {
    row = td.parentElement.parentElement;
    var index = row.rowIndex - 1;
    employees.splice(index, 1);

    document.getElementById("employeeTable").deleteRow(row.rowIndex);
  }