import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, registerLocaleData } from '@angular/common';
import { ItemService } from './item.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item, Price } from './item.model';
import { SharedModule } from '@app/shared/shared.module';
import es from '@angular/common/locales/es';

registerLocaleData(es, 'es');
@Component({
  standalone: true,
  selector: 'app-item',
  templateUrl: './item.component.html',
  imports : [SharedModule, CommonModule]
})
export class ItemComponent implements OnInit {

  item: Item = {};
  prices: Price[];

  constructor(
    private itemService: ItemService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {

    if (this.data.listItem.itemId) {
      this.itemService.searchItemById(this.data.listItem.itemId).subscribe(async item => {
        this.item = item;
        this.prices = item.prices;
        await this.getPrices(this.item);
      });
    }
  }

  getPrices( item: Item) {
    const monthAgo: Date = new Date(new Date().setMonth(new Date().getMonth() -1));

    const lastPriceUpdateDate: Date = new Date(item.lastPriceUpdateDate);
    if (!item.prices || lastPriceUpdateDate?.getTime() < monthAgo.getTime() ) {
      this.itemService.getItemPrices(item._id).subscribe (req => {
        this.prices = req as Price[];
      });
    }
  }

}
