import { User } from "@app/core/auth/user.model";
import { ListItem } from "./list-item.model";

export interface Ticket {
  capture?: string;
}
export class Card {
  file: string;
}

export interface ListFile {
  file: string;
  type: FileType;
  mimeType: string;
  date: Date;
}

export enum FileType {
  IMAGE = 'Image',
  TICKET = 'Ticket',
  CARD = 'CARD',
  OTHER  = 'Other'
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
  tags?: string[];
  createdAt?: string;
  cards?: Card[];
  files?: ListFile[];

  //constructor(_id?: string, name?: string, description?: string, listItems?: ListItem[], cartItems?: ListItem[], owner?: User, sharedUsers?: User[], images?: string[], totals?: any, income?: boolean, tags?: string[]) {
  constructor(list: List) {
    list._id ? this._id = list._id : null;
    list.name ? this.name = list.name : null;
    list.description ? this.description = list.description : null;
    list.listItems ? this.listItems = list.listItems : null;
    list.cartItems ? this.cartItems = list.cartItems : null;
    list.owner ? this.owner = list.owner : null;
    list.sharedUsers ? this.sharedUsers = list.sharedUsers : null;
    list.images ? this.images = list.images : null;
    list.totals ? this.totals = list.totals : null;
    list.income ? this.income = list.income : null;
    list.tags ? this.tags = list.tags : null;
  }
}
