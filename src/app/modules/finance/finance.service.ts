import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  public statsSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public stats: Observable<any>;

  constructor(
    private http: HttpClient,
  ) { 
    this.stats = this.statsSubject.asObservable();
  }

  /**
   * getStats
   */
  public getStats() {
    return this.http.get<any>(`${environment.apiUrl}/saved-list?hideFields=images,listItems,cartItems`).subscribe(
      res => {
        this.statsSubject.next(res.data);
      },
      error => {
        console.error('getStats error: ', error);
      }
    );
  }
}
