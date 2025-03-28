import { DB } from "../db/DB.js";
export class OrderDetails {
  constructor(orderId, itemId, itemName, itemPrice, quantity) {
    this.orderId = orderId;
    this.itemId = itemId;
    this.itemName = itemName;
    this.itemPrice = itemPrice;
    this.quantity = quantity;
  }

  static saveOrderDetail(orderDetail) {
    for (var i = 0; i < orderDetail.length; i++) {
      DB.OrderDetails.push(orderDetail[i]);
    }
    console.log(DB.OrderDetails.length);
  }

  static getAllById(id) {
    let order = DB.OrderDetails;
    let orderDetail = [];

    for (let index = 0; index < order.length; index++) {
      if (order[index].orderId === id) {
        orderDetail.push(order[index]);
      }
    }

    return orderDetail.length > 0 ? orderDetail : null;
  }
}
