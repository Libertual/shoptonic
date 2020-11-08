import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  userListsSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private http: HttpClient
  ) { 
    this.http.get<any>(`${environment.apiUrl}/list`).subscribe(
      res => {
        this.userListsSubject.next(res);
      }
    );
  }
  public get userLists() {
    return this.userListsSubject.value;
  }
}
