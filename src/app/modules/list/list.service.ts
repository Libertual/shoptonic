import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private http: HttpClient
  ) { 
    this.http.get<any>(`${environment.apiUrl}/list`).subscribe(
      res => {
        console.log('userlists', res); 
      }
    );
  }
  getUserLists() {

  }
}
