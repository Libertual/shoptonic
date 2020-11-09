import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '@app/core/account/account.service';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html'
})
export class NavigationBarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  public navigation;
  constructor(
    public readonly homeService: HomeService,
    public readonly translate: TranslateService,
    private readonly accountService: AccountService
    ) { }

  ngOnInit(): void {
    this.homeService.navigation.subscribe(nav => {
      this.navigation = nav;
    })
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }

  logout() {
    this.accountService.logout();
}
}
