import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HomeService } from '@app/core/home/home.service';
import { ItemDTO } from '../item/item.dto';
import { ItemService } from '../item/item.service';
import { ListItemDTO } from './list-item.dto';
import { ListService } from './list.service';
import { ListItemDialogComponent } from './list-item-dialog/list-item-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  list: any;
  listTotals: any = {listTotal: 0, cartTotal: 0, total: 5};
  listForm: FormGroup;
  foundItems = [];
  isDragging = false;

  constructor(
    private formBuilder: FormBuilder,
    public readonly homeService: HomeService,
    private route: ActivatedRoute,
    private listService: ListService,
    private itemService: ItemService,
    public dialog: MatDialog
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
      this.listService.totals.subscribe( totals => {
        this.listTotals = totals[params.id] ? totals[params.id] : {listTotal: 0, cartTotal: 0, total: 0};
      });
      this.listService.userLists.subscribe(lists => {
        this.list = lists.length > 0 ? lists.find(list => list._id === params.id) : { name: '---' };
        const navigation = {
          title: this.list.name
        }
        this.homeService.navigationSubject.next(navigation);
      });
    });
  }
  
  openDialog(listItem: ListItemDTO, type: string): void {
    const dialogRef = this.dialog.open(ListItemDialogComponent, {
      data: {
        listItem,
        listId: this.list._id,
        type
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.info('The dialog was closed', result);
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

  public newItem() {
    const item: ItemDTO = {name: this.search};
    this.itemService.addItem(item).subscribe(item => {
      this.addItemToList(item);
      this.search = '';
    });
  }

  public addItemToList(item: ItemDTO): void {
    const listItem: ListItemDTO = new ListItemDTO(item._id, item.name, 1);
    this.listService.addItemToList(this.list._id, listItem).subscribe(res => {
      this.listService.getUserList();
      this.foundItems = [];
      this.search = '';
    })
  }

  public addListItemToList(listItem:ListItemDTO): void {
    //const listItem: ListItemDTO = new ListItemDTO(item._id, item.name, 1);
    this.listService.addItemToList(this.list._id, listItem).subscribe(res => {
      this.listService.getUserList();
      this.foundItems = [];
      this.search = '';
    })
  }

  public addListItemToListCart(listItem: ListItemDTO): void {
    //const listItem: ListItemDTO = new ListItemDTO(item._id, item.name, 1);
    this.listService.addItemToListCart(this.list._id, listItem).subscribe(res => {
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
  }

  public removeItemFromList(listItem) {
    this.listService.removeItemFromList(this.list._id, listItem._id);
  }

  public removeItemFromListCart(listItem) {
    this.listService.removeItemFromListCart(this.list._id, listItem._id);
  }

  drop(event: CdkDragDrop<ListItemDTO[]>) { // TODO: Tipear correctamente
    const listItem: ListItemDTO = event.previousContainer.data[event.previousIndex];
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.previousContainer.id === 'listItems' && event.container.id === 'cartItems'){
        this.moveListItemToCart(listItem);
      }
      if (event.previousContainer.id === 'cartItems'){
        this.removeItemFromListCart(listItem);
        if (event.container.id === 'listItems'){
          this.addListItemToList(event.previousContainer.data[event.previousIndex])
        }
      }
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    // 
  }

  public moveListItemToCart(listItem: ListItemDTO): void {
    this.removeItemFromList(listItem);
    this.addListItemToListCart(listItem);
  }

  public moveCartItemToList(listItem: ListItemDTO): void {
    this.removeItemFromListCart(listItem);
    this.addListItemToList(listItem);
  }

  public editItem(item: ItemDTO): void {

  }
}
