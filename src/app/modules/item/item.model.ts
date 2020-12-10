export class Item {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  barcode?: string;
  openFoodFactsProduct?: any;

  constructor(name: string, barcode: string, description?: string, price?: number) {
    this.name = name || undefined;
    this.barcode = barcode || undefined;
    this.description = description || undefined;
    this.price = price || undefined;
  }
}