import { User } from "@app/core/account/user.model";
import { ListItem } from "./list-item.model";

export interface Ticket {
  capture?: string;
}
export class List {
  _id?: string;
  name?: string;
  description?: string;
  listItems?: ListItem[];
  cartItems?: ListItem[];
  owner?: User;
  sharedUsers?: User[];
  images?: string[];
  totals?: any;
  income?: boolean;

  constructor(name?: string, description?: string, listItems?: ListItem[], cartItems?: ListItem[], owner?: User, sharedUsers?: User[], images?: string[], totals?: any, income?: boolean) {
    name ? this.name = name : null;
    description ? this.description = description : null;
    listItems ? this.listItems = listItems : null;
    cartItems ? this.cartItems = cartItems : null;
    owner ? this.owner = owner : null;
    sharedUsers ? this.sharedUsers = sharedUsers : null;
    images ? this.images = images : null;
    totals ? this.totals = totals : null;
    income ? this.income = income : null;
  }
}