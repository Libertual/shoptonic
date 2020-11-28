import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from '@app/core/account/account.service';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListItemDTO } from './list-item.dto';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public userListsSubject: BehaviorSubject<ListItemDTO[]> = new BehaviorSubject([]);
  public listsTotalsSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  public userLists: Observable<any>;
  public totals: Observable<any>;

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
  ) { 
    this.userLists = this.userListsSubject.asObservable();
    this.totals = this.listsTotalsSubject.asObservable();
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
      (res: any[]) => {
        this.userListsSubject.next(res);
        const listTotals = {};
        res.map(list => {
          listTotals[list._id] = {};
          listTotals[list._id].listTotal = 0
          listTotals[list._id].listQuantityTotal = 0;
          listTotals[list._id].cartTotal = 0
          listTotals[list._id].cartQuantityTotal = 0;
          list.listItems.forEach(li => {
            listTotals[list._id].listTotal += Number(li.price || 0) * Number(li.quantity || 0);
            listTotals[list._id].listQuantityTotal += Number(li.quantity || 0)
          });
          list.cartItems.forEach(li => {
            listTotals[list._id].cartTotal += Number(li.price || 0) * Number(li.quantity || 0);
            listTotals[list._id].cartQuantityTotal += Number(li.quantity || 0)
          });

          listTotals[list._id].total = listTotals[list._id].listTotal + listTotals[list._id].cartTotal
        });
        this.listsTotalsSubject.next(listTotals)
      }
    );
  }

  public removeItemFromList(listId: string, listItemId: string) {
    return this.http.delete(`${environment.apiUrl}/list/${listId}/item/${listItemId}`).subscribe(
      res => {
        this.getUserList();
      }
    );
  }

  public removeItemFromListCart(listId: string, cartItemId: string) {
    return this.http.delete(`${environment.apiUrl}/list/${listId}/cart/item/${cartItemId}`).subscribe(
      res => {
        this.getUserList();
      }
    );
  }

  public updateListItem(listId: string, listItem: ListItemDTO, type: string) {
    const listItemId = listItem._id;
    delete listItem._id;
    let url: string;
    switch(type) {
      case 'list': {
        url = `${environment.apiUrl}/list/${listId}/list/item/${listItemId}`;
        break;
      }
      case 'cart': {
        url = `${environment.apiUrl}/list/${listId}/cart/item/${listItemId}`;
        break;
      }
      default: {
        url = `${environment.apiUrl}/list/${listId}/list/item/${listItemId}`;
        break;
      }
    }
    return this.http.put(url, listItem).subscribe(
      res => {
        this.getUserList();
      }
    );
  }

  public purchase(listId: string, listItems: ListItemDTO[], listTotals: any) {
    return this.http.post(`${environment.apiUrl}/purchase`, {listId, listItems, totalPrice: listTotals.cartTotal, totalQuantity: listTotals.cartQuantityTotal});
  }

  public removeListItems(listId: string) {
    return this.http.delete(`${environment.apiUrl}/list/${listId}/list`);
  }

  public removeCartItems(listId: string) {
    return this.http.delete(`${environment.apiUrl}/list/${listId}/cart`);
  }
}
