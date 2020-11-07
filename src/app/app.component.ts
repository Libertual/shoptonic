import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from './core/account/account.service';
import { User } from './core/account/user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  user: User;

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
  title = 'Shoptonic';
}
