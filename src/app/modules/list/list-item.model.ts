export class ListItem {
  _id?: string;
  name: string;
  quantity: number;
  price?: number;
  currency?: string;
  barcode?: string;
  itemId: string;
  
  constructor(itemId: string, name: string, quantity?: number, price?: number, barcode?: string, currency?: string) {
    this.quantity = quantity || 1;
    this.name = name || null;
    this.price = price || 0;
    this.itemId = itemId;
    this.barcode = barcode || null;
  }
}