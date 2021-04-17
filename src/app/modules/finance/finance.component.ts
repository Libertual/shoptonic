import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { FinanceService } from './finance.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styles: [
  ]
})
export class FinanceComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            'year': 'MMM DD'
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
   }

  ngOnInit(): void {
    this.financeService.stats.subscribe(
      res => { 
        this.lineChartLabels = [];
        this.lineChartData = [];
        const data = [];
        // Group by Date
        const totalByDate = {};
        const groupedByDate = {};
        res.map( item =>{
          const date: Date = new Date(item.createdAt);
          const day = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
          groupedByDate[day] = item;
          if (totalByDate[day]) totalByDate[day] += item.totals.total
          else totalByDate[day] = item.totals.total;
        });
        for( const key in totalByDate) {
          data.push(totalByDate[key]);
          this.lineChartLabels.push(key);
        }

        this.lineChartData.push({ data },)
      }
    );
  }

  /**
   * onClick
   */
  public onClick($event) {
    console.log('onClick', $event);
  }
}

