const employees = []; // Array to store employee objects

// ...

const addButton = document.getElementById("add");
addButton.addEventListener("click", (e) => {
  e.preventDefault();

  var employeeID = document.getElementById("employeeID").value;
  var employeeName = document.getElementById("employeeName").value;
  var employeeAge = document.getElementById("employeeAge").value;
  var employeeGender = document.getElementById("employeeGender").value;
  var errorMessage = document.getElementsByClassName("errorMessage");

  for (var i = 0; i < errorMessage.length; i++) {
    errorMessage[i].innerHTML = "";
  }

  if (employeeID === "") {
    errorMessage[0].innerHTML = "Employee ID is required";
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
  insertNewRecord(formData);
  resetForm();
});

// Insert the data
function insertNewRecord(data) {

  var employee = {
    employeeID: data.employeeID,
    employeeName: data.employeeName,
    employeeAge: data.employeeAge,
    employeeGender: data.employeeGender
  };

  var existingEmployee = employees.find(function(employee) {
    return employee.employeeID === data.employeeID;
  });

  if (existingEmployee) {
    return false;
  }

  employees.push(employee); // Add employee object to the array

  var table = document.getElementById("employeeTable");
  var tbody = table.getElementsByTagName("tbody")[0];
  var newRow = tbody.insertRow(tbody.length);
  var cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.employeeID;
  var cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.employeeName;
  var cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.employeeAge;
  var cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.employeeGender;
  var cell5 = newRow.insertCell(4);
  cell5.innerHTML = `<button onclick="onEdit(this)">Edit</button> <button onclick="onDelete(this)">Delete</button>`;

}



// Update the data
function onEdit(button) {
  selectedRow.cells[0].innerHTML = formData.employeeID;
  selectedRow.cells[1].innerHTML = formData.employeeName;
  selectedRow.cells[2].innerHTML = formData.employeeAge;
  selectedRow.cells[3].innerHTML = formData.employeeGender;

  // Update the corresponding employee object in the array
  var index = selectedRow.rowIndex - 1;
  employees[index].employeeID = formData.employeeID;
  employees[index].employeeName = formData.employeeName;
  employees[index].employeeAge = formData.employeeAge;
  employees[index].employeeGender = formData.employeeGender;

}

// Delete the data
function onDelete(td) {
    row = td.parentElement.parentElement;
    var index = row.rowIndex - 1;
    employees.splice(index, 1);

    document.getElementById("employeeTable").deleteRow(row.rowIndex);
  }