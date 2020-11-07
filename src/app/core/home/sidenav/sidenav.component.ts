import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/core/account/account.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent implements OnInit {
  session;
  constructor(
    private router: Router,
    private accountService: AccountService
    ) { 
      this.session = this.accountService.sessionValue;

    }

  ngOnInit(): void {

  }
}
