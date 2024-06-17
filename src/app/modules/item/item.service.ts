import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ItemDTO } from './item.dto';
import { Item, Price } from './item.model';

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

  public updateItemPrice(itemId: string, item: ItemDTO) {
    return this.http.patch<any>(`${environment.apiUrl}/item/${itemId}`, item);
  }

  public updateItem(item: Item) {
    return this.http.post<Item>(`${environment.apiUrl}/item`, item);
  }

  public getItemPrices(itemId: string) {
    return this.http.get<Price[]>(`${environment.apiUrl}/item/${itemId}/prices`);
  }

}
