import { DB } from "../db/DB.js";
export class Order {
  constructor(id, date, total, subTotal, customerId) {
    this.id = id;
    this.date = date;
    this.total = total;
    this.subTotal = subTotal;
    this.customerId = customerId;
  }
  static genarateId() {
    let orders = DB.Orders;

    if (orders.length === 0) {
      return "ORD-001";
    }

    let lastId = orders[orders.length - 1].id;
    let subString = parseInt(lastId.substring(4));
    let newNumber = subString + 1;

    let generateId = "ORD-" + newNumber.toString().padStart(3, "0");
    return generateId;
  }

  static calculatePrice(price, qty) {
    return price * qty;
  }

  static discount(total, discount) {
    let disc = total * (discount / 100);
    return total - disc;
  }

  static saveOrder(order) {
    return DB.Orders.push(order);
  }

  static getOrderCount() {
    return DB.Orders.length;
  }

  static checkId(id) {
    let order = DB.Orders;
    for (let index = 0; index < order.length; index++) {
      if (order[index].id === id) {
        return false;
      }
    }
    return true;
  }

  static getAllById(id) {
    let order = DB.Orders;
    for (let index = 0; index < order.length; index++) {
      if (order[index].id === id) {
        return order[index];
      }
    }
    return null;
  }
}
