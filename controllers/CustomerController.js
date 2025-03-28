import { Customer } from "../models/Customer.js";

$(document).ready(function () {
  console.log("Customer");

  $(".btnSave").click(function (event) {
    event.preventDefault();

    let id = $(".cID").val();
    let name = $(".cName").val();
    let address = $(".cAddress").val();
    let salary = $(".cSalary").val();
    let customer = new Customer(id, name, address, salary);
    let idExist = Customer.checkId(id);

    if (isValidate(id, name, address, salary) && idExist) {
      Customer.save(customer);
      addToTables(customer);
      $(".form")[0].reset();
      alert("Customer saved successfully");
      custCount();
    }
    if (!idExist) {
      $(".idError").text("Id is Already exist");
    }
  });

  function addToTables(user) {
    let table = $(".custom");
    let newRow = `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.address}</td>
        <td>${user.salary}</td>
        </tr>`;
    $(table).append(newRow);
  }

  $(".cID").on("input", function () {
    const id = $(".cID").val();
    if (id == "" || !/^C\d{2}-\d{3}$/.test(id)) {
      $(".idError").text("ID is required(pattern: C00-001)");
      $(".cID").css("border-color", "red");
    } else {
      $(".idError").text("");
      $(".cID").css("border-color", "green");
    }
  });

  $(".cName").on("input", function () {
    const name = $(".cName").val();
    if (name == "" || !/^[A-Za-z\s]{3,}$/.test(name)) {
      $(".nameError").text("Name is required");
      $(".cName").css("border-color", "red");
    } else {
      $(".nameError").text("");
      $(".cName").css("border-color", "green");
    }
  });

  $(".cAddress").on("input", function () {
    const address = $(".cAddress").val();
    if (address.length < 4) {
      $(".addressError").text("Address is required");
      $(".cAddress").css("border-color", "red");
    } else {
      $(".addressError").text("");
      $(".cAddress").css("border-color", "green");
    }
  });

  $(".cSalary").on("input", function () {
    const salary = $(".cSalary").val();
    if (
      salary === "" ||
      !/^\d+(\.\d{2})?$/.test(salary) ||
      parseFloat(salary) < 100
    ) {
      $(".salaryError").text("Salary is required(min:100.00)");
      $(".cSalary").css("border-color", "red");
    } else {
      $(".salaryError").text("");
      $(".cSalary").css("border-color", "green");
    }
  });

  function isValidate(iD, names, Address, salarys) {
    let id = iD;
    let name = names;
    let address = Address;
    let salary = salarys;
    let isValid = true;

    if (id == "" || !/^C\d{2}-\d{3}$/.test(id)) {
      $(".idError").text("ID is required(pattern: C00-001)");
      $(".cID").css("border-color", "red");
      isValid = false;
    } else {
      $(".idError").text("");
      $(".cID").css("border-color", "green");
    }

    if (name == "" || !/^[A-Za-z\s]{3,}$/.test(name)) {
      $(".nameError").text("Name is required");
      $(".cName").css("border-color", "red");
      isValid = false;
    } else {
      $(".nameError").text("");
      $(".cName").css("border-color", "green");
    }

    if (address.length < 4) {
      $(".addressError").text("Address is required");
      $(".cAddress").css("border-color", "red");
      isValid = false;
    } else {
      $(".addressError").text("");
      $(".cAddress").css("border-color", "green");
    }

    if (
      salary === "" ||
      !/^\d+(\.\d{2})?$/.test(salary) ||
      parseFloat(salary) < 100
    ) {
      $(".salaryError").text("Salary is required(min:100.00)");
      $(".cSalary").css("border-color", "red");
      isValid = false;
    } else {
      $(".salaryError").text("");
      $(".cSalary").css("border-color", "green");
    }
    return isValid;
  }

  $(".custom").on("click", "tr", function () {
    //set data to text field
    let details = $(this).find("td");

    $(".cID").val(details.eq(0).text());
    $(".cName").val(details.eq(1).text());
    $(".cAddress").val(details.eq(2).text());
    $(".cSalary").val(details.eq(3).text());
  });

  $(".btnRemove").click(function (event) {
    event.preventDefault();
    let customerId = $(".cID").val();
    Customer.remove(customerId);
    removeRowById(customerId);
    $(".form")[0].reset();
    alert("Customer removed successfully");
    custCount();
  });

  $(".btnClear").on("click", function (event) {
    event.preventDefault();
    $(".form")[0].reset();
  });

  function removeRowById(customerId) {
    $("tbody tr").each(function () {
      if ($(this).find("td:first").text() === customerId) {
        $(this).remove();
      }
    });
  }

  $(".btnUpdate").click(function (event) {
    event.preventDefault();
    let id = $(".cID").val();
    let name = $(".cName").val();
    let address = $(".cAddress").val();
    let salary = $(".cSalary").val();
    var isValid = isValidate(id, name, address, salary);
    let customer = new Customer(id, name, address, salary);
    if (isValid) {
      Customer.update(customer);
      $(".custom tr").each(function () {
        if ($(this).find("td:first").text() === id) {
          $(this).find("td").eq(1).text(name);
          $(this).find("td").eq(2).text(address);
          $(this).find("td").eq(3).text(salary);
        }
      });
      $(".form")[0].reset();
      alert("Customer updated successfully");
    }
  });

  $(".btnGetAll").on("click", function (event) {
    event.preventDefault();
    let cuId = $(".cID").val();
    let custs = Customer.getAllById(cuId);
    if (custs) {
      $(".cName").val(custs.name);
      $(".cAddress").val(custs.address);
      $(".cSalary").val(custs.salary);
      $(".idError").text("");
      $(".cID").css("Border-color", "green");
      $(".nameError").text("");
      $(".cName").css("Border-color", "green");
      $(".addressError").text("");
      $(".cAddress").css("Border-color", "green");
      $(".salaryError").text("");
      $(".cSalary").css("Border-color", "green");
    } else {
      $(".idError").text("Enter Customer Id");
      $(".cID").css("Border-color", "red");
    }
  });

  function custCount() {
    let custCount = Customer.getCustomerCount();
    console.log(custCount);
    $(".custCount").text(custCount);
  }
});
