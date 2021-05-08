import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FinanceService } from './finance.service';


registerLocaleData(es, 'es');
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
  displayedColumns: string[] = ['date', 'name', 'total'];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  
  tableDataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedGroupDate: string = 'day';
  dateGroupsSelect: any[] = [ 'day', 'week', 'month', 'year'];
  globalTotal = 0;

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
    this.financeService.filteredData.subscribe(
      res => { 
        this.setTableDataSource(res);
        this.lineChartLabels = [];
        this.lineChartData = [];
        const data = [];
        // Group by Date
        const totalBy = {};
        res.map( item =>{
          const date: Date = new Date(item.createdAt);
          // const weekDate: Date = this.getDateOfWeek(this.getWeek(date), date);
          const weekDate: Date = this.getWeekDate(new Date(item.createdAt));
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

        this.globalTotal = 0;
        for( const key in totalBy[this.selectedGroupDate]) {
          this.globalTotal += totalBy[this.selectedGroupDate][key];
          data.push(totalBy[this.selectedGroupDate][key]);
          this.lineChartLabels.push(key);
        }
        if (data.length > 0 ) this.lineChartData.push({ data })
        this.allTags = this.financeService.getListTags();
        this.filterTags();
      }
    );    
  }

  public setTableDataSource(data) {
    const datasource = data.map( item => {
      return {
        date: item.createdAt,
        name: item.name,
        total: item.totals.total
        
      }
    });
    this.tableDataSource = new MatTableDataSource<any>(datasource);
    this.tableDataSource.paginator = this.paginator;
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
   * Get date of the week
   * @param date 
   * @returns 
   */
  public getWeekDate(date)
  {
    var lastday = date.getDate() - date.getDay() + 1;
    return new Date(date.setDate(lastday)); 
  }
}
