import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenFoodFactsService {
  url = "https://prices.openfoodfacts.org/api/v1/products/code/";
  urlv1 = "https://world.openfoodfacts.org/api/v1/product/";

  constructor(
    private http: HttpClient
  ) { }

  public getProductByBarcodev1(barcode: string): Observable<any> { // TODO: obtener el modelo de datos de producto en openfoodfacts
    return this.http.get(this.urlv1 + barcode + '.json');
  }
  public getProductByBarcode(barcode: string): Observable<any> { // TODO: obtener el modelo de datos de producto en openfoodfacts
    return this.http.get(this.url + barcode);
  }
}
