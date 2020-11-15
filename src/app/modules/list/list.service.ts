import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListItemDTO } from './list-item.dto';

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
    this.getUserList();
  }
  public get userListsValue() {
    return this.userListsSubject.value;
  }

  public addItemToList(listId: string, listItem: ListItemDTO) {
    return this.http.patch(`${environment.apiUrl}/list/${listId}/item`, listItem);
  }

  public addItemToListCart(listId: string, listItem: ListItemDTO) {
    return this.http.patch(`${environment.apiUrl}/list/${listId}/cart/item`, listItem);
  }

  public getUserList() {
    return this.http.get(`${environment.apiUrl}/list`).subscribe(
      res => {
        this.userListsSubject.next(res);
      }
    );
  }

  public removeItemFromList(listId: string, listItemId: string) {
    return this.http.delete(`${environment.apiUrl}/list/${listId}/item/${listItemId}`).subscribe(
      res => {
        console.log('Borrado', res)
        this.getUserList();
      }
    );
  }

  public removeItemFromListCart(listId: string, cartItemId: string) {
    return this.http.delete(`${environment.apiUrl}/list/${listId}/cart/item/${cartItemId}`).subscribe(
      res => {
        console.log('Borrado', res)
        this.getUserList();
      }
    );
  }
}
