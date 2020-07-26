import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { DashboardService } from './../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;

  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const amount = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          return label + this.decimalPipe.transform(amount, '1.2-2');
        }
      }
    }
  };

  constructor(
    private dashboardService: DashboardService,
    private decimalPipe: DecimalPipe) { }

  ngOnInit() {
    this.configPieChart();
    this.configLineChart();
  }

  configPieChart() {
    this.dashboardService.journalEntriesByCategory()
      .then(informations => {
        this.pieChartData = {
          labels: informations.map(information => information.category.name),
          datasets: [
            {
              data: informations.map(information => information.amount),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                                  '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      });
  }

  configLineChart() {
    this.dashboardService.journalEntriesByDay()
      .then(informations => {
        const daysOfMonth = this.configDaysOfMonth();
        const amountOfIncome = this.amountByEachDayOfMonth(
          informations.filter(information => information.entryType === 'RECEITA'), daysOfMonth);
        const amountOfOutcome = this.amountByEachDayOfMonth(
          informations.filter(information => information.entryType === 'DESPESA'), daysOfMonth);

        this.lineChartData = {
          labels: daysOfMonth,
          datasets: [
            {
              label: 'Receitas',
              data: amountOfIncome,
              borderColor: '#3366CC'
            }, {
              label: 'Despesas',
              data: amountOfOutcome,
              borderColor: '#D62B00'
            }
          ]
        }
      });
  }

  private amountByEachDayOfMonth(informations, daysOfMonth) {
    const totalAmount: number[] = [];
    for (const day of daysOfMonth) {
      let amount = 0;

      for (const information of informations) {
        if (information.day.getDate() === day) {
          amount = information.amount;

          break;
        }
      }

      totalAmount.push(amount);
    }

    return totalAmount;
  }

  private configDaysOfMonth() {
    const referenceMonth = new Date();
    referenceMonth.setMonth(referenceMonth.getMonth() + 1);
    referenceMonth.setDate(0);

    const quantity = referenceMonth.getDate();

    const days: number[] = [];

    for (let i = 1; i <= quantity; i++) {
      days.push(i);
    }

    return days;
  }
}
