import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ItemDTO } from './item.dto';
import { Item, Price, Source } from './item.model';
import { InvoiceLine } from '../invoice/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient
  ) { }

  public searchItemById(itemId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/item/${itemId}`);
  }

  public searchItemsByName(name: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/item?name=${name}`);
  }

  public searchItemsByBarcode(barcode: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/item?barcode=${barcode}`);
  }

  public addItem(item: ItemDTO) {
    return this.http.post<any>(`${environment.apiUrl}/item`, item);
  }

  public updateItemPrice(itemId: string, itemPrice: number, user: string) {
    const price = new Price(itemPrice, user, Source.USER, 'EUR', new Date());
    return this.http.put<any>(`${environment.apiUrl}/item/${itemId}/prices`, price);
  }

  public updateItem(item: Item) {
    return this.http.post<Item>(`${environment.apiUrl}/item`, item);
  }

  public getItemPrices(itemId: string) {
    return this.http.get<Price[]>(`${environment.apiUrl}/item/${itemId}/prices`);
  }

  public setInvoiceLineBarcode(invoiceId: string, invoiceLine: InvoiceLine): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/invoice/${invoiceId}/line/${invoiceLine._id}`,{invoiceLine});
  }
}
