import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/core/auth/account.service';
import { ListService } from '@app/modules/list/list.service';
import { MatAccordion } from '@angular/material/expansion';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  session;
  userLists: any;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private listService: ListService,
    private homeService: HomeService
    ) {
      this.session = this.accountService.sessionValue;
      this.userLists = this.listService.userListsSubject;
    }

  ngOnInit(): void {

  }

  onHome() {
    const navigation = {
      title: 'Shopitify',
      list: null
    };
    console.log('onHome: ', navigation);
    this.homeService.navigationSubject.next(navigation);
  }
}
