import { Customer } from "../models/Customer.js";
import { Item } from "../models/Item.js";
import { Order } from "../models/Order.js";
import { OrderDetails } from "../models/OrderDetail.js";
$(document).ready(function () {
  let OrderDetail = [];
  let newId = Order.genarateId();
  $(".orderID").val(newId);

  $(".customerChoice").on("click", function () {
    let customers = Customer.getCustomerIDs();

    let select = $("#customerID");

    let selectedValue = select.val();

    select.empty();
    select.append('<option value="">-- Select Customer --</option>');

    if (!customers || !Array.isArray(customers)) {
      console.error("Error: customerIDs is not an array");
      return;
    }

    customers.forEach((id) => {
      let option = $(`<option value="${id}">${id}</option>`);
      if (id === selectedValue) {
        option.attr("selected", "selected");
      }
      select.append(option);
    });
  });

  $("#customerID").on("change", function () {
    let selectedValue = $(this).val();

    if (selectedValue) {
      $(this).find("option:selected").text(selectedValue);
      setDetails(selectedValue);
    }
  });

  function setDetails(id) {
    let customerDetails = Customer.getAllById(id);
    console.log(customerDetails);
    $(".custId").val(customerDetails.id);
    $(".custName").val(customerDetails.name);
    $(".custAddress").val(customerDetails.address);
    $(".custSalary").val(customerDetails.salary);
  }

  $(".itemChoice").on("click", function () {
    let items = Item.getItemIDs();

    let select = $("#itemID");

    let selectedValue = select.val();

    select.empty();
    select.append('<option value="">-- Select Item --</option>');

    if (!items || !Array.isArray(items)) {
      console.error("Error: ItemIds is not an array");
      return;
    }

    items.forEach((id) => {
      let option = $(`<option value="${id}">${id}</option>`);
      if (id === selectedValue) {
        option.attr("selected", "selected");
      }
      select.append(option);
    });
  });

  $("#itemID").on("change", function () {
    let selectedValue = $(this).val();

    if (selectedValue) {
      $(this).find("option:selected").text(selectedValue);
      setItemDetails(selectedValue);
    }
  });

  function setItemDetails(id) {
    let itemDetails = Item.getAllById(id);
    console.log(itemDetails);
    $(".itemCode").val(itemDetails.id);
    $(".itemName").val(itemDetails.name);
    $(".qty").val(itemDetails.quantity);
    $(".price").val(itemDetails.price);
  }

  $(".addItem").on("click", function (event) {
    event.preventDefault();
    let itemCode = $(".itemCode").val();
    let itemName = $(".itemName").val();
    let price = $(".price").val();
    let quantity = parseInt($(".orderQty").val());
    let qtyOnH = parseInt($(".qty").val());

    let total = Order.calculatePrice(price, quantity);
    if (quantity <= qtyOnH && quantity > 0) {
      $(".orderQty").css("border-color", "skyblue");
      $(".oQtyError").text("");
      let table = $(".order-table");
      let newRow = `<tr>
            <td>${itemCode}</td>
            <td>${itemName}</td>
            <td>${price}</td>
            <td>${quantity}</td>
            <td>${total}</td>
            </tr>`;
      let orderdetails = new OrderDetails(
        $(".orderID").val(),
        itemCode,
        itemName,
        price,
        quantity
      );
      console.log(orderdetails);
      OrderDetail.push(orderdetails);
      $(table).append(newRow);
      updateItem(itemCode, itemName, $(".qty").val() - quantity, price);

      updateGrandTotal(total);
      Item.reduceQty(quantity, itemCode);
      document.getElementById("itemForm").reset();
      $(".itemChoice").text("");
    } else {
      $(".orderQty").css("border-color", "red");
      $(".oQtyError").text("Invalid quantity");
    }
  });

  function updateGrandTotal(total) {
    let currentTotal = parseFloat($(".total").text()) || 0;
    let newTotal = currentTotal + total;
    $(".total").text(newTotal);
    $(".subTotal").text(newTotal);
  }

  $(".cash").on("input", function () {
    let cash = parseFloat($(".cash").val()) || 0;
    let total = parseFloat($(".subTotal").text()) || 0;
    let balance = cash - total;
    $(".balance").val(balance);
  });

  $(".discount").on("input", function () {
    let total = parseFloat($(".total").text()) || 0;
    let discount = $(".discount").val();
    let net = Order.discount(total, discount);
    $(".subTotal").text(net);
    let cash = parseFloat($(".cash").val()) || 0;
    let total1 = parseFloat($(".subTotal").text()) || 0;
    let balance = cash - total1;
    $(".balance").val(balance);
  });

  $(".purchases").on("click", function (event) {
    event.preventDefault();
    let order = $(".orderID").val();
    let cash = $(".cash").val();
    let subTotal = parseFloat($(".subTotal").text()) || 0;
    let oId = $(".orderID").val();
    let total = parseFloat($(".total").text()) || 0;
    let date = $(".date").val();
    let custId = $(".custId").val();
    let order1 = new Order(oId, date, total, subTotal, custId);
    console.log(order1);
    if (cash >= total && valide(order) && total > 0) {
      if (Order.saveOrder(order1)) {
        OrderDetails.saveOrderDetail(OrderDetail);
        alert("Order Placed Successfully");
        $(".errorCash").text("");
        orderCount();
        $(".total, .subTotal").text("0");
        $(".cash, .balance").val(0);
        $(".discount").val("");
        $(".order-table tbody").empty();
        $(".Invoice")[0].reset();
        $(".orderID").val(Order.genarateId());
        OrderDetail = [];
      } else {
        alert1("Order Placed not Successful");
      }
      $(".cashError").text("");
    } else {
      if (cash < total) {
        alert("Insufficient balance");
        $(".cashError").text("insuficent Balance");
      } else if (!valide(order)) {
        alert("Incorrect Order Id");
        $(".ordError").text("Order Id required (pattern: ORD-001)");
      } else if (!total > 0) {
        alert("Item Not added");
      }
    }
  });

  function valide(oId) {
    if ((oId = "" || !/^ORD-\d{3}$/.test(oId))) {
      $(".orderID").css("border-color", "red");
      return false;
    } else {
      $(".orderID").css("border-color", "skyblue");
      $(".ordError").text("");
      return true;
    }
  }
  function orderCount() {
    let orderCount = Order.getOrderCount();
    $(".orderCount").text(orderCount);
  }

  function updateItem(id, name, qty, price) {
    $(".items tr").each(function () {
      let rowId = $(this).find("td:first").text();
      if (rowId === id) {
        $(this).find("td").eq(1).text(name);
        $(this).find("td").eq(2).text(qty);
        $(this).find("td").eq(3).text(price);
      }
    });
  }

  $(".orderID").on("input", function () {
    let oID = $(".orderID").val();
    console.log(oID);
    let od = Order.getAllById(oID);
    console.log(od);
    if (od) {
      let cid = od.customerId;
      let customer = Customer.getAllById(cid);
      let orderDetails = OrderDetails.getAllById(od.id);
      console.log(orderDetails);
      $(".date").val(od.date);
      $(".custId").val(customer.id);
      $(".custName").val(customer.name);
      $(".custAddress").val(customer.address);
      $(".custSalary").val(customer.salary);

      $(".total").text(od.total);
      $(".subTotal").text(od.subTotal);

      for (let index = 0; index < orderDetails.length; index++) {
        console.log(orderDetails[index]);
        let newRow = `<tr>
                    <td>${orderDetails[index].itemId}</td>
                    <td>${orderDetails[index].itemName}</td>
                    <td>${orderDetails[index].itemPrice}</td>
                    <td>${orderDetails[index].quantity}</td>
                    <td>${
                      orderDetails[index].itemPrice *
                      orderDetails[index].quantity
                    }</td>
                    </tr>`;
        $(".order-table").append(newRow);
      }
    } else {
      $(".date").val("");
      $(".custId").val("");
      $(".custName").val("");
      $(".custAddress").val("");
      $(".custSalary").val("");

      $(".total").text("0.00");
      $(".subTotal").text("00.00");
      $(".order-table tbody").empty();
    }
  });
});
