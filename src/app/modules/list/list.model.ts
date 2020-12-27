import { ListItem } from "./list-item.model";

export class List {
  _id?: string;
  name?: string;
  description?: string;
  listItems?: ListItem[];
  cartItems?: ListItem[];

  constructor(name?: string, description?: string) {
    name ? this.name = name : null;
    description ? this.description = description : null;
  }
}