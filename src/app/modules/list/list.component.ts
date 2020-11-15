import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '@app/core/home/home.service';
import { ItemDTO } from '../item/item.dto';
import { ItemService } from '../item/item.service';
import { ListItemDTO } from './list-item.dto';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  list: any;
  listForm: FormGroup;
  foundItems = [];
  isDragging = false;

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
      this.listService.userLists.subscribe(lists => {
        this.list = lists.length > 0 ? lists.find(list => list._id === params.id) : { name: '---' };
        const navigation = {
          title: this.list.name
        }
        this.homeService.navigationSubject.next(navigation);
      });
    });
  }

  public getFilteredItems(searchFilter: string) {
    if (searchFilter.length > 0) {
      this.itemService.searchItemsByfilter(searchFilter).subscribe(data => {
        this.foundItems = data;
      })
    } else {
      this.foundItems = [];
    }
  }

  public addItem() {
    const item: ItemDTO = {name: this.search};
    this.itemService.addItem(item).subscribe(item => {
      this.addItemToList(item);
      this.search = '';
    });
  }

  public addItemToList(item): void {
    const listItem: ListItemDTO = new ListItemDTO(item._id, item.name, 1);
    this.listService.addItemToList(this.list._id, listItem).subscribe(res => {
      console.log('item added to list', res);
      this.listService.getUserList();
      this.foundItems = [];
      this.search = '';
    })
  }

  public addItemToListCart(item): void {
    const listItem: ListItemDTO = new ListItemDTO(item._id, item.name, 1);
    this.listService.addItemToListCart(this.list._id, listItem).subscribe(res => {
      console.log('item added to cart list', res);
      this.listService.getUserList();
      this.foundItems = [];
      this.search = '';
    })
  }

  public clear() {
    this.search = '';
  }

  public dragging(state) {
    this.isDragging = state;
    console.log('dragging', state);
  }

  public removeItemFromList(listItem) {
    console.log('removeItemFromList', listItem);
    this.listService.removeItemFromList(this.list._id, listItem._id);
  }

  public removeItemFromListCart(listItem) {
    console.log('removeItemFromListCart', listItem);
    this.listService.removeItemFromListCart(this.list._id, listItem._id);
  }

  public addShoppingCart(item) {
    console.log('addShoppingCart', item);
  }

  drop(event: CdkDragDrop<any[]>) { // TODO: Tipear correctamente
    const item = event.previousContainer.data[event.previousIndex];
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('event.previousContainer.id', event.previousContainer.id);
      if (event.previousContainer.id === 'listItems'){
        console.log('removeItemFromList', item);
        this.removeItemFromList(item);
        if (event.container.id === 'cartItems'){
          console.log('addItemToCartList', item);
          this.addItemToListCart(item)
        }
      }
      if (event.previousContainer.id === 'cartItems'){
        this.removeItemFromListCart(item);
        if (event.container.id === 'listItems'){
          this.addItemToList(event.previousContainer.data[event.previousIndex])
        }
      }
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    // 
  }
}
