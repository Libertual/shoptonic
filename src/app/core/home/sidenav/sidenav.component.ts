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
export class SidenavComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  session;
  userLists: any;
  constructor(
    private accountService: AccountService,
    private listService: ListService,
    ) {
      this.session = this.accountService.sessionValue;
      this.userLists = this.listService.userListsSubject;
    }

  onClick(list) {
    this.listService.listValue = list;
  }
}
