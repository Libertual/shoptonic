import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public navigationSubject: BehaviorSubject<any> = new BehaviorSubject({title: 'Shopitify'});
  public navigation : Observable<any>;
  constructor() {
    console.log('HomeService: ', this.navigation);
    this.navigation = this.navigationSubject.asObservable();
  }

}
