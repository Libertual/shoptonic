import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: [
  ]
})
export class ConfirmComponent implements OnInit {
  confirmedMessage = '';
  constructor(
    private readonly accountService: AccountService,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.confirmedMessage = 'account.NotConfirmedMessage';
    this.route.queryParams.subscribe((params) => {
      this.accountService.confirmEmail(params.token).subscribe(res => {
        if (res) {
          this.confirmedMessage = 'account.confirmedMessage';
        }
      });
    });
  }

}
