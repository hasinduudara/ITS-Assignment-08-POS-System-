import { DB } from "../db/DB.js";
export class Customer {
  constructor(id, name, address, salary) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.salary = salary;
  }

  static save(customer) {
    DB.customers.push(customer);
  }
  static remove(id) {
    DB.customers = DB.customers.filter((customer) => customer.id !== id);
  }

  static update(updatedCustomer) {
    let index = DB.customers.findIndex(
      (customer) => customer.id === updatedCustomer.id
    );
    if (index !== -1) {
      DB.customers[index] = updatedCustomer;
    }
  }

  static getCustomerCount() {
    return DB.customers.length;
  }

  static checkId(id) {
    let cust = DB.customers;
    for (let index = 0; index < cust.length; index++) {
      if (cust[index].id === id) {
        return false;
      }
    }
    return true;
  }

  static getCustomerIDs() {
    return DB.customers.map((customer) => customer.id);
  }

  static getAllById(id) {
    return DB.customers.find((customer) => customer.id === id) || null;
  }
}
