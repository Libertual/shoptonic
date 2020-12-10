import { ItemDTO } from '../item/item.dto';

export class ListItemDTO {
  _id?: string;
  name: string;
  quantity: number;
  price?: number;
  currency?: string;
  itemId: string;
  
  constructor(itemId: string, name: string, quantity?: number, price?: number, currency?: string) {
    this.quantity = quantity || 1;
    this.name = name || null;
    this.price = price || 0;
    this.itemId = itemId;
  }
}