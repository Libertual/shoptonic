import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { DecimalPipe, registerLocaleData } from '@angular/common';
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
  /** True if a tag can be selected */
  selectable = true;
  /** True if can remove a tag */
  removable = true;
  /** separators */
  separatorKeysCodes: number[] = [ENTER, COMMA];
  /** Tag form control */
  tagCtrl = new FormControl();
  /** Filtered tags array */
  filteredTags: Observable<string[]>;
  /** Tags */
  tags: string[] = [];
  /** Al tags */
  allTags: string[] = [];
  /** Column names array  */
  displayedColumns: string[] = ['date', 'name', 'total'];

  /** Tags input control  */
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  /** Autocomplete component */
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  /** Material accordion component */
  @ViewChild(MatAccordion) accordion: MatAccordion;
  
  /** Table data Source */
  tableDataSource: MatTableDataSource<any>;
  /** Material paginator */
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
  
  /**
   * Constructor
   * @param financeService 
   * @param _decimalPipe 
   */
  constructor(
    private financeService: FinanceService,
    private _decimalPipe: DecimalPipe
  ) {
    this.financeService.getStats();
    this.filterTags();
   }

   /**
    * Filter list tags
    */
   private filterTags() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(''),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.filter(tag => !this.tags.includes(tag))));
   }

  /**
   * On init
   */
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
          let total: number = totalBy[this.selectedGroupDate][key];
          total = Math.round(total * 100) / 100;
          data.push(total);
          this.lineChartLabels.push(key);
        }
        if (data.length > 0 ) this.lineChartData.push({ data })
        this.allTags = this.financeService.getListTags();
        this.filterTags();
      }
    );    
  }
  /**
   * Set table data source
   * @param data 
   */
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
