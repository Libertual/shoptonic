import { ListItemDTO } from "./list-item.dto";

export class List {
  _id?: string;
  name?: string;
  description?: string;
  listItems?: ListItemDTO[];
  cartItems?: ListItemDTO[];

  constructor(name?: string, description?: string) {
    name ? this.name = name : null;
    description ? this.description = description : null;
  }
}