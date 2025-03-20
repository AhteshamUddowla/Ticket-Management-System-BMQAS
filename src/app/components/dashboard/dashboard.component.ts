import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/angular-material/angular-material.module';
import {ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
// import { NgChartsModule } from 'ng2-charts';


export interface Ticket {
  id: number;
  title: string;
  status:
  string;
}
Chart.register(...registerables);
@Component({
  selector: 'app-cards',
  imports: [ MaterialModule, CommonModule, BaseChartDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
 // Bar Graph Data1
 barGraphData: ChartConfiguration<'bar'>['data'] = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

// Bar Graph Options
barGraphOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Months',
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Sales',
      },
    },
  },
  plugins: {
    title: {
      display: true,
      text: 'Monthly Sales Data',
    },
    legend: {
      position: 'top',
    },
  },
};


  // pie chart4
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        data: [300, 50, 100, 40, 120, 80],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  // Pie Chart Options
  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Pie Chart Example',
      },
      legend: {
        position: 'top',
      },
    },
  };
  // 3 Progress Bar Value
  progressValue = 65; // Example value (0 to 100)

  // Doughnut Chart (Circular Gauge) Configuration
  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Progress', 'Remaining'],
    datasets: [
      {
        data: [65, 35], // 65% progress, 35% remaining
        backgroundColor: ['#4CAF50', '#E0E0E0'], // Green for progress, gray for remaining
        hoverBackgroundColor: ['#4CAF50', '#E0E0E0'],
      },
    ],
  };

  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '70%', // Adjust the size of the hole in the middle
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
  };

}