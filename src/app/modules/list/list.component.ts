import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { HomeService } from "@app/core/home/home.service";
import { ItemDTO } from "../item/item.dto";
import { ItemService } from "../item/item.service";
import { ListItem } from "./list-item.model";
import { ListService } from "./list.service";
import { ListItemDialogComponent } from "./list-item-dialog/list-item-dialog.component";
import { ScannerDialogComponent } from "../scanner/item-scanner-dialog/scanner-dialog.component";
import { Item } from "../item/item.model";
import { OpenFoodFactsService } from "../open-food-facts/open-food-facts.service";
import { List } from "./list.model";
import { ImageAttachComponent } from "@app/shared/components/image-attach/image-attach.component";
import { ListGalleryComponent } from "@app/shared/components/list-gallery/list-gallery.component";
import { ConfirmDialogComponent } from "@app/shared/components/confirm-dialog/confirm-dialog.component";
import { forkJoin, Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
})
export class ListComponent implements OnInit {
  list: List;
  listTotals: any = { listTotal: 0, cartTotal: 0, total: 5 };
  listForm: FormGroup;
  foundItems = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public readonly homeService: HomeService,
    private route: ActivatedRoute,
    private listService: ListService,
    private itemService: ItemService,
    public dialog: MatDialog,
    private openFoodFactsService: OpenFoodFactsService
  ) {
    this.listForm = this.formBuilder.group({
      search: [""],
    });
  }

  set search(val) {
    this.listForm.get("search").setValue(val);
  }
  get search() {
    return this.listForm.get("search").value;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.listService.totals.subscribe((totals) => {
        this.listTotals = totals[params.id]
          ? totals[params.id]
          : { listTotal: 0, cartTotal: 0, total: 0 };
      });
      this.listService.userLists.subscribe((lists) => {
        this.list =
          lists.length > 0
            ? lists.find((list) => list._id === params.id)
            : { name: "---" };
        const navigation = {
          title: this.list.name,
        };
        this.homeService.navigationSubject.next(navigation);
      });
    });
  }

  editDialog(listItem: ListItem, type: string): void {
    const dialogRef = this.dialog.open(ListItemDialogComponent, {
      data: {
        listItem,
        listId: this.list._id,
        type,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.info("The dialog was closed", result);
    });
  }

  public getFilteredItems(searchFilter: string) {
    if (searchFilter.length > 0) {
      this.itemService.searchItemsByName(searchFilter).subscribe((data) => {
        this.foundItems = data;
      });
    } else {
      this.foundItems = [];
    }
  }

  public newItem() {
    const item: ItemDTO = { name: this.search };
    this.itemService.addItem(item).subscribe((item) => {
      this.addItemToList(item);
      this.search = "";
    });
  }

  public addItemToList(item: ItemDTO): void {
    const listItem: ListItem = new ListItem(
      item._id,
      item.name,
      1,
      item.price,
      item.barcode
    );

    this.listService.addItemToList(this.list._id, listItem).subscribe((res) => {
      this.listService.getUserLists();
      this.foundItems = [];
      this.search = "";
    });
  }

  public addListItemToList(listItem: ListItem): void {
    this.listService.addItemToList(this.list._id, listItem).subscribe((res) => {
      this.listService.getUserLists();
      this.foundItems = [];
      this.search = "";
    });
  }

  public addListItemToListCart(listItem: ListItem): void {
    this.listService
      .addItemToListCart(this.list._id, listItem)
      .subscribe((res) => {
        this.listService.getUserLists();
        this.foundItems = [];
        this.search = "";
      });
  }

  public clear() {
    this.search = "";
  }

  public removeItemFromList(listItem) {
    this.listService.removeItemFromList(this.list._id, listItem._id);
  }

  public removeItemFromListCart(listItem) {
    this.listService.removeItemFromListCart(this.list._id, listItem._id);
  }

  drop(event: CdkDragDrop<ListItem[]>) {
    // TODO: Tipear correctamente
    const listItem: ListItem =
      event.previousContainer.data[event.previousIndex];
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      if (
        event.previousContainer.id === "listItems" &&
        event.container.id === "cartItems"
      ) {
        this.moveListItemToCart(listItem);
      }
      if (event.previousContainer.id === "cartItems") {
        this.removeItemFromListCart(listItem);
        if (event.container.id === "listItems") {
          this.addListItemToList(
            event.previousContainer.data[event.previousIndex]
          );
        }
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  public moveListItemToCart(listItem: ListItem): void {
    this.removeItemFromList(listItem);
    this.addListItemToListCart(listItem);
  }

  /**
   * Move cart item to list
   * @param listItem List item
   */
  public moveCartItemToList(listItem: ListItem): void {
    this.removeItemFromListCart(listItem);
    this.addListItemToList(listItem);
  }

  /**
   * Confirm save current list
   */
  public saveListConfirm(): void {

    const dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "lists.confirm.save",
        message: "lists.confirm.saveListMessage"
      }
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) this.saveList();
    });
  }

  /**
   * Save list
   * Chage saved to true a create new list with de same name
   */
  public saveList() {
    this.list.totals = this.listTotals;
    this.listService.saveList(this.list).subscribe( res => {
      console.log('list saved: ', res);
      this.emptyList();
    });
  }

  /**
   * emptyList
  */
  public emptyList() {
    const obserbables: Observable<any>[] = [
      this.listService.removeListItems(this.list._id).pipe(catchError(e => of({error: true, e}))),
      this.listService.removeCartItems(this.list._id).pipe(catchError(e => of({error: true, e}))),
      this.listService.deleteAllImages(this.list._id).pipe(catchError(e => of({error: true, e})))
    ]  
    forkJoin(obserbables).subscribe(
    next => {
      console.log('forkjoin: ', next);
      next[0].error ? this.list.listItems = []: null;
      next[1].error ? this.list.cartItems = []: null;
      next[2].error ? this.list.images = [] : null;
      this.listService.getUserLists();
    },
    error => {
      console.log('Error: ', error);
    }
    );
  }
  
  /**
   * launchCamera
   */
  public launchCamera() {
    const dialogRef: MatDialogRef<ImageAttachComponent> = this.dialog.open(
      ImageAttachComponent,
      { data: { listId: this.list._id } }
    );

    dialogRef.afterClosed().subscribe((capture) => {
      if (capture) {
        this.list.images.push(capture);
        this.listService
          .addImageToList(this.list._id, capture)
          .subscribe((res) => {});
      }
    });
  }

  /**
   * Show list gallery
   */
  public showGallery() {
    const dialogRef: MatDialogRef<ListGalleryComponent> = this.dialog.open(
      ListGalleryComponent,
      { data: { images: this.list.images } }
    );
    dialogRef.afterClosed().subscribe((res) => {
      console.log("showGallery res: ", res);
    });
  }

  /**
   * Clear list items from list and from cart.
   */
  public clearList(): void {
    const dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(
      ConfirmDialogComponent,
      {
        data: {
          title: "lists.confirm.delete",
          message: "lists.confirm.deleteListMessage",
        },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.listService.removeListItems(this.list._id).subscribe((_res) => {
          this.list.listItems = [];
          this.listService.getUserLists();
        });
        this.listService.removeCartItems(this.list._id).subscribe((_res) => {
          this.list.cartItems = [];
          this.listService.getUserLists();
        });
      }
    });
  }

  /**
   * Remove items from cart list
   */
  public removeCartItems(): void {
    this.listService.removeCartItems(this.list._id).subscribe((_res) => {
      this.list.cartItems = [];
      this.listService.getUserLists();
    });
  }

  /**
   * Open scanner embebed app
   */
  public openScanner() {
    const item = {};
    const dialogRef = this.dialog.open(ScannerDialogComponent);

    dialogRef.afterClosed().subscribe((barcode) => {
      item
        ? this.processBarcode(barcode)
        : console.info("Botón cerrar pulsado");
    });
  }

  /**
   * Process barcode data on list
   * @param barcode
   * @returns 
   */
  private async processBarcode(barcode: string) {
    let item: Item = await this.itemService
      .searchItemsByBarcode(barcode)
      .toPromise();
    if (item) {
      this.addItemToList(item);
      return;
    } else {
      const result = await this.openFoodFactsService
        .getProductByBarcode(barcode)
        .toPromise();
      if (result.status !== 0) {
        const productResult = result.product;
        let productName: string = "";
        if (
          productResult.generic_name_es &&
          productResult.generic_name_es !== ""
        ) {
          productName = productResult.generic_name_es;
        } else if (
          productResult.product_name_es &&
          productResult.product_name_es !== ""
        ) {
          productName = productResult.product_name_es;
        } else if (
          productResult.generic_name &&
          productResult.generic_name !== ""
        ) {
          productName = productResult.generic_name;
        } else if (
          productResult.product_name &&
          productResult.product_name !== ""
        ) {
          productName = productResult.product_name;
        }

        item = new Item(productName, barcode);
        item.openFoodFactsProduct = productResult;

        this.itemService.addItem(item).subscribe((res) => {
          item._id = res._id;
          this.addItemToList(item);
        });
      } else {
        console.info("No encontrado en OpenFoodFactsService");
      }
    }
  }
}
