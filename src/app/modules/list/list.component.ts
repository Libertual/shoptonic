import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '@app/core/home/home.service';
import { ItemService } from '../item/item.service';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  list: any;
  listForm: FormGroup;
  foundItems = [];

  constructor(
    private formBuilder: FormBuilder,
    public readonly homeService: HomeService,
    private route: ActivatedRoute,
    private listService: ListService,
    private itemService: ItemService
  ) {
    this.listForm = this.formBuilder.group({
      search: [''],
    });
  }
  set search(val) {
    this.listForm.get('search').setValue(val);
  }
  get search() {
    return this.listForm.get('search').value
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('params', params);
      this.listService.userLists.subscribe(lists => {
        console.log('userLists', lists);
        this.list = lists.length > 0 ? lists.find(list => list._id === params.id) : { name: '---' };
        const navigation = {
          title: this.list.name
        }
        this.homeService.navigationSubject.next(navigation);
      });
    });

  }

  public getFilteredItems(searchFilter: string) {
    console.log('event', searchFilter);
    if (searchFilter.length > 0) {
      this.itemService.searchItemsByfilter(searchFilter).subscribe(data => {
        console.log('data', data);
        this.foundItems = data;
      })
    } else {
      this.foundItems = [];
    }

  }

  public addItem() {
    console.log('add', this.search)
  }

  public clear() {
    this.search = '';
  }

}
