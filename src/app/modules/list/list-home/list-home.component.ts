import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-home',
  templateUrl: './list-home.component.html'
})
export class ListHomeComponent implements OnInit {

  userLists: any;
  constructor(
    private listService: ListService
  ) { 
    this.userLists = this.listService.userListsSubject;
  }

  ngOnInit(): void {
  }
}
