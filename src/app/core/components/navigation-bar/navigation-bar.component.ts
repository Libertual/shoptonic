import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html'
})
export class NavigationBarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    console.log('translate', this.translate);
  }

  changeLanguage(lang): void {
    this.translate.use(lang);
  }
}
