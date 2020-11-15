import { ItemDTO } from '../item/item.dto';

export class ListItemDTO {
  name: string;
  quantity: number;
  price: number;
  currency: string;
  _id: string;

  constructor(_id: string, name: string, quantity?: number, price?: number, currency?: string) {
    this.quantity = quantity || null;
    this.name = name || null;
    this.price = price || null;
    this._id = _id;
  }
}