import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public userListsSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  public userLists: Observable<any>;
  constructor(
    private http: HttpClient
  ) { 
    this.userLists = this.userListsSubject.asObservable();
    this.http.get<any>(`${environment.apiUrl}/list`).subscribe(
      res => {
        this.userListsSubject.next(res);
      }
    );
  }
  public get userListsValue() {
    return this.userListsSubject.value;
  }
}
