import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/core/account/account.service';
import { ListService } from '@app/modules/list/list.service';
import { MatAccordion } from '@angular/material/expansion';

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
    private listService: ListService
    ) { 
      this.session = this.accountService.sessionValue;
      this.userLists = this.listService.userListsSubject;
      console.log('ul', this.userLists);
    }

  ngOnInit(): void {

  }
}
