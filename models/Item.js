import { DB } from "../db/DB.js";
export class Item {
  constructor(id, name, quantity, price) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

  static saveitem(item) {
    DB.items.push(item);
    console.log(DB.items.length);
  }

  static removeitem(id) {
    DB.items = DB.items.filter((item) => item.id !== id);
  }

  static updateItem(item) {
    let index = DB.items.findIndex((item) => item.id == item.id);
    if (index !== -1) {
      DB.items[index] = item;
    }
  }

  static getItemCount() {
    return DB.items.length;
  }

  static checkId(id) {
    let item = DB.items;
    for (let index = 0; index < item.length; index++) {
      if (item[index].id === id) {
        return false;
      }
    }
    return true;
  }

  static getItemIDs() {
    return DB.items.map((item) => item.id);
  }

  static getAllById(id) {
    return DB.items.find((item) => item.id === id) || null;
  }

  static reduceQty(qty, id) {
    let details = DB.items.find((item) => item.id === id);
    details.quantity -= qty;
  }
}
