import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from './core/auth/account.service';

import { User } from './core/auth/user.model';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shopitify-web';
  user: User|null = null;

  constructor (
    private accountService: AccountService,
    translate: TranslateService
  ) {
    // usuario
    this.accountService.session.subscribe(x => this.user = x? x.user: null);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('es');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('es');

    //this.data = this.scanner.isAutostarting;

  }
}
