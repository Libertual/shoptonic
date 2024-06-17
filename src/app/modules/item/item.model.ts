import { User } from "@app/core/auth/user.model";

export class Item {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  barcode?: string;
  openFoodFactsProduct?: any;
  prices?: Price[];
  lastPriceUpdateDate?: Date;

  constructor(name: string, barcode: string, description?: string, price?: number) {
    this.name = name || undefined;
    this.barcode = barcode || undefined;
    this.description = description || undefined;
    this.price = price || undefined;
  }
}

export class Price {
  price: number;
  date: Date;
  source: Source;
  createdBy: User;
}

export enum Source {
  SYSTEM = 'System',
  OPEN_FOOD_FACTS = 'OpenFoodFacts',
  USER = 'User'
}
