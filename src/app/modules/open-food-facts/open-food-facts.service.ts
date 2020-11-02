import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenFoodFactsService {
  url = "https://world.openfoodfacts.org/api/v0/product/";

  constructor(
    private http: HttpClient
  ) { }

  public getProductByBarcode(barcode: string): Observable<any> { // TODO: obtener el modelo de datos de producto en openfoodfacts
    return this.http.get(this.url + barcode + '.json');
  }
}
