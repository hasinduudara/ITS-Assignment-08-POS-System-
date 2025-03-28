import { Item } from "../models/Item.js";
$(document).ready(function () {
  $(".input1").on("input", function () {
    let id = $(".iID").val();
    let name = $(".iName").val();
    let qty = $(".Qty").val();
    let price = $(".unitPrice").val();
  });

  $(".btnSaveItem").on("click", function (event) {
    event.preventDefault();

    let id = $(".iID").val();
    let name = $(".iName").val();
    let qty = $(".Qty").val();
    let price = $(".unitPrice").val();
    let item = new Item(id, name, qty, price);
    let idExist = Item.checkId(id);
    if (isValidate(id, name, qty, price) && idExist) {
      Item.saveitem(item);
      addToTables(item);
      $(".form")[1].reset();
      itemCount();
      alert("Do you want to add this item?");
    }
    if (!idExist) {
      $(".itemIdError").text("Id is Already exist");
    }
  });

  $(".items").on("click", "tr", function () {
    //set data to text field
    let details = $(this).find("td");

    $(".iID").val(details.eq(0).text());
    $(".iName").val(details.eq(1).text());
    $(".Qty").val(details.eq(2).text());
    $(".unitPrice").val(details.eq(3).text());
  });

  $(".btnRemoveItem").on("click", function (event) {
    event.preventDefault();

    let id = $(".iID").val();
    Item.removeitem(id);
    removeRowById(id);
    $(".form")[1].reset();
    itemCount();
    alert("Do you want to remove this item?");
  });

  $(".btnUpdateItem").on("click", function (event) {
    event.preventDefault();
    let id = $(".iID").val();
    let name = $(".iName").val();
    let qty = $(".Qty").val();
    let price = $(".unitPrice").val();
    let isValid = isValidate(id, name, qty, price);
    let items = new Item(id, name, qty, price);
    if (isValid) {
      Item.updateItem(items);
      $(".items tr").each(function () {
        if ($(this).find("td:first").text() === id) {
          $(this).find("td").eq(1).text(name);
          $(this).find("td").eq(2).text(qty);
          $(this).find("td").eq(3).text(price);
        }
      });
      $("form")[1].reset();
      alert("Updated item Successfully");
    }
  });

  $(".btnClear").on("click", function (event) {
    event.preventDefault();
    $(".form")[1].reset();
  });

  function removeRowById(itemId) {
    $(".items tbody tr").each(function () {
      if ($(this).find("td:first").text() === itemId) {
        $(this).remove();
      }
    });
  }

  function addToTables(user) {
    let table = $(".items");
    let newRow = `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.quantity}</td>
        <td>${user.price}</td>
        </tr>`;
    $(table).append(newRow);
  }

  $(".iID").on("input", function () {
    const id = $(this).val();
    if (id == "" || !/^I\d{2}-\d{3}$/.test(id)) {
      $(".itemIdError").text("ID is required(pattern: I00-001)");
      $(".iID").css("border-color", "red");
    } else {
      $(".itemIdError").text("");
      $(".iID").css("border-color", "green");
    }
  });

  $(".iName").on("input", function () {
    const name = $(this).val();
    if (name == "" || !/^[A-Za-z\s]{3,}$/.test(name)) {
      $(".itemNameError").text("Name is required");
      $(".iName").css("border-color", "red");
    } else {
      $(".itemNameError").text("");
      $(".iName").css("border-color", "green");
    }
  });

  $(".Qty").on("input", function () {
    const qtys = $(this).val();
    if (qtys == "" || !/^\d+$/.test(qtys)) {
      $(".qtyError").text("Quantity is required");
      $(".Qty").css("border-color", "red");
    } else {
      $(".qtyError").text("");
      $(".Qty").css("border-color", "green");
    }
  });

  $(".unitPrice").on("input", function () {
    const prices = $(this).val();
    if (prices == "" || !/^\d+(\.\d{2})?$/.test(prices)) {
      $(".priceError").text("Price is required(ex: 200.00)");
      $(".unitPrice").css("border-color", "red");
    } else {
      $(".priceError").text("");
      $(".unitPrice").css("border-color", "green");
    }
  });

  function isValidate(iD, names, quantity, price) {
    let id = iD;
    let name = names;
    let qtys = quantity;
    let prices = price;
    let isValid = true;

    if (id == "" || !/^I\d{2}-\d{3}$/.test(id)) {
      $(".itemIdError").text("ID is required(pattern: I00-001)");
      $(".iID").css("border-color", "red");
      isValid = false;
    } else {
      $(".itemIdError").text("");
      $(".iID").css("border-color", "green");
    }

    if (name == "" || !/^[A-Za-z\s]{3,}$/.test(name)) {
      $(".itemNameError").text("Name is required");
      $(".iName").css("border-color", "red");
      isValid = false;
    } else {
      $(".itemNameError").text("");
      $(".iName").css("border-color", "green");
    }

    if (qtys == "" || !/^\d+$/.test(qtys)) {
      $(".qtyError").text("Quantity is required");
      $(".Qty").css("border-color", "red");
      isValid = false;
    } else {
      $(".qtyError").text("");
      $(".Qty").css("border-color", "green");
    }

    if (prices == "" || !/^\d+(\.\d{2})?$/.test(prices)) {
      $(".priceError").text("Price is required(ex: 200.00)");
      $(".unitPrice").css("border-color", "red");
      isValid = false;
    } else {
      $(".priceError").text("");
      $(".unitPrice").css("border-color", "green");
    }
    return isValid;
  }
  function itemCount() {
    let custCount = Item.getItemCount();
    console.log(custCount);
    $(".itemCount").text(custCount);
  }
  $(".btnGetAllitem").on("click", function (event) {
    event.preventDefault();
    let iId = $(".iID").val();
    console.log(iId);
    let ite = Item.getAllById(iId);
    if (ite) {
      $(".iName").val(ite.name);
      $(".Qty").val(ite.quantity);
      $(".unitPrice").val(ite.price);
      $(".itemIdError").text("");
      $(".iName").css("Border-color", "green");
      $(".itemNameError").text("");
      $(".cName").css("Border-color", "green");
      $(".qtyError").text("");
      $(".Qty").css("Border-color", "green");
      $(".priceError").text("");
      $(".unitPrice").css("Border-color", "green");
    } else {
      $(".itemIdError").text("Enter Item Id");
      $(".iID").css("Border-color", "red");
    }
  });
});
