import { Item } from "../models/Item.js";
import { Order } from "../models/Order.js";
import { Customer } from "../models/Customer.js";
$(document).ready(function () {
  itemCount();
  orderCount();
  custCount();
  function itemCount() {
    let custCount = Item.getItemCount();
    console.log(custCount);
    $(".itemCount").text(custCount);
  }
  function orderCount() {
    let orderCount = Order.getOrderCount();
    $(".orderCount").text(orderCount);
  }

  function custCount() {
    let custCount = Customer.getCustomerCount();
    console.log(custCount);
    $(".custCount").text(custCount);
  }

  window.onload = function () {
    window.setText = function (h1) {
      if (h1 === "Dashboard") {
        $(".main-heading").text("Dashboard");
      } else if (h1 === "customer") {
        $(".main-heading").text("Customer Manage");
      } else if (h1 === "item") {
        $(".main-heading").text("Item Manage");
      } else if (h1 === "order") {
        $(".main-heading").text("Place Order");
      }
    };
  };
});
