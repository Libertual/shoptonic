import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { List } from '../list/list.model';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  public dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public filteredDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public allData: Observable<any>;
  public filteredData: Observable<List[]>;

  constructor(
    private http: HttpClient,
  ) { 
    this.allData = this.dataSubject.asObservable();
    this.filteredData = this.filteredDataSubject.asObservable();
  }

  /**
   * getStats
   * @param tags
   */
  public getStats() {
    return this.http.get<any>(`${environment.apiUrl}/saved-list?hideFields=images,listItems,cartItems`).subscribe(
      res => {
        this.dataSubject.next(res.data);
        this.filteredDataSubject.next(res.data); //TODO: provisional
        console.log('data', res.data);
      },
      error => {
        console.error('getStats error: ', error);
      }
    );
  }

  /**
   * Get list tags
   * @returns 
   */
  public getListTags(): string[]{
    const tags: string[] = [];
    this.dataSubject.value.map(item => {
      for (let tag of item.tags) {
        !tags.includes(tag) ? tags.push(tag): null;
      }
    });
    return tags;
  }

  /**
   * Filter data
   * @param tags 
   */
  public filterData(tags: string[]) {
    const filteredData = (tags && tags.length > 0 ) ? 
      this.dataSubject.value.filter(data => data.tags.some(t => tags.indexOf(t) >= 0)):
      this.dataSubject.value;
    console.log('filteredData', filteredData);
    this.filteredDataSubject.next(filteredData);    
  }
}
