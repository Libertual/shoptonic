import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  userLists: any;
  constructor(
    private listService: ListService
  ) { 
    this.userLists = this.listService.userListsSubject;
  }

  ngOnInit(): void {
  }

}
