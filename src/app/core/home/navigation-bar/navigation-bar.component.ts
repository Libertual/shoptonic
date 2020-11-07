import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '@app/core/account/account.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html'
})
export class NavigationBarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(
    public readonly translate: TranslateService,
    private readonly accountService: AccountService
    ) { }

  ngOnInit(): void {}

  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }

  logout() {
    this.accountService.logout();
}
}
