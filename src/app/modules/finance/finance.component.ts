import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAccordion } from '@angular/material/expansion';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FinanceService } from './finance.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styles: [
  ]
})
export class FinanceComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  selectedGroupDate: string = 'day';
  dateGroupsSelect: any[] = [ 'day', 'week', 'month', 'year'];

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            'hour':  'MMM DD HH:mm',
            'day':   'MMM DD',
            'month': 'MMM DD',
            'year':  'YYYY MMM DD'
          }
        }
      }],
    },
    legend:
    {
        display: false
    }
  };

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  
  constructor(
    private financeService: FinanceService
  ) {
    this.financeService.getStats();
    this.filterTags();
   }

   private filterTags() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(''),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.filter(tag => !this.tags.includes(tag))));
   }

  ngOnInit(): void {
    this.groupData();
  }

  /**
   * groupData
   */
  public groupData() {
    console.log('Group: ', this.selectedGroupDate);
    this.financeService.filteredData.subscribe(
      res => { 
        this.lineChartLabels = [];
        this.lineChartData = [];
        const data = [];
        // Group by Date
        const totalBy = {};
        res.map( item =>{
          const date: Date = new Date(item.createdAt);
          const weekDate: Date = this.getDateOfWeek(this.getWeek(date), date);
          let dateGroup;
          if(this.selectedGroupDate === 'day') dateGroup = date.getFullYear() + '-' + (date.getMonth() + 1)   + '-' + date.getDate()
            else if (this.selectedGroupDate === 'month') dateGroup = date.getFullYear() + '-' + (date.getMonth() + 1)
            else if (this.selectedGroupDate === 'year') dateGroup = date.getFullYear()
            else if (this.selectedGroupDate === 'week') dateGroup = weekDate.getFullYear() + '-' + (weekDate.getMonth() + 1)   + '-' + weekDate.getDate();

          //groupedByDay[day] = item;
          for (let group of this.dateGroupsSelect) {
            if(!totalBy[group]) totalBy[group] = {};
            if (totalBy[group][dateGroup]) totalBy[group][dateGroup] += item.totals.total
            else totalBy[group][dateGroup] = item.totals.total;
          }
        });

        console.log('dateGroup', totalBy, this.selectedGroupDate);
        for( const key in totalBy[this.selectedGroupDate]) {
          data.push(totalBy[this.selectedGroupDate][key]);
          this.lineChartLabels.push(key);
        }
        if (data.length > 0 ) this.lineChartData.push({ data })
        this.allTags = this.financeService.getListTags();
        this.filterTags();
      }
    );    
  }
  
  /**
   * onClick
   */
  public onClick($event) {
    console.log('onClick', $event);
  }

  /**
   * Add tag
   * @param event 
   */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  /**
   * Remove tag
   * @param tag 
   */
  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.filterTags();
    this.financeService.filterData(this.tags);
  }

  /**
   * Filter data on selected tag
   * @param event 
   */
  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    this.financeService.filterData(this.tags);
  }

  /**
   * Filtro
   * @param value 
   * @returns 
   */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
   
    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0 && !this.tags.includes(tag));
  }

  /**
   * Get Week
   * @param date 
   * @returns 
   */
  private getWeek(date: Date) {
    const onejan: Date = new Date(date.getFullYear(),0,1);
    return Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay()+1)/7);
  }
  
  /**
   * Get date of week
   * @param week 
   * @param date 
   * @returns 
   */
  private getDateOfWeek(week: number, date: Date) {
    var d = (1 + (week - 1) * 7); // 1st of January + 7 days for each week

    return new Date(date.getFullYear(), 0, d);
}
}

