import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../modules/angular-material/angular-material.module';
import {ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';






export interface Ticket {
  id: number;
  title: string;
  status:
  string;
}
Chart.register(...registerables);
@Component({
  selector: 'app-cards',
  imports: [ MaterialModule, CommonModule, BaseChartDirective, MatCardModule, MatProgressBarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
 
  //bar chart1
  public barChartLegend = true;
  public barChartPlugins = [];
  // Chart data
  
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      { 
        label: 'Total Tickets',
        data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75, 80],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      { 
        label: 'Closed Tickets',
        data: [28, 48, 40, 19, 86, 27, 90, 35, 50, 60, 45, 70],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { autoSkip: false }
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.1)' }
      }
    },
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { enabled: true }
    },
    animation: { duration: 300 }
  };

  // Pie baad doughnut chart4 data
  @Input() title = 'Performance Metrics';
  private readonly remInPixels = 16;
  get chartWidth(): number {
    return 25 * this.remInPixels;
  }
  get chartHeight(): number {
    return 20 * this.remInPixels - 80;
  }
  // Pie chart configuration
  public chartType: ChartType = 'doughnut';
  
  public chartData: ChartConfiguration['data'] = {
    labels: ['IT', 'Finance', 'Customer Service'],
    datasets: [{
      data: [60, 25, 15],
      backgroundColor: [
        '#4CAF50', // Green
        '#2196F3', // Blue
        '#FFC107'  // Amber
      ],
      borderWidth: 2,
      borderColor: '#ffffff',
      hoverOffset: 10
    }]
  };
  // Pie Chart Options
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        enabled: true,
        bodyFont: {
          size: 12
        }
      }
    },
    elements: {
      arc: {
        borderRadius: 4
      }
    }
  };
public chartPlugins = [];




  // 3 Progress Bar Value
  progressValue = 65; 
  // value (0 to 100)

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

  //last chart
  @Input() titles = 'Progress Overview';
  @Input() progressValues = 65;
  @Input() progressLabel = 'Completion';
  @Input() progressThickness = 24;
  @Input() progressColor: 'primary' | 'accent' | 'warn' = 'primary';

  miniDoughnutData: ChartConfiguration['data'] = {
    labels: ['Progress', 'Remaining'],
    datasets: [{
      data: [this.progressValue, 100 - this.progressValue],
      backgroundColor: ['#3f51b5', '#f5f5f5'],
      borderWidth: 0,
      hoverBorderWidth: 0
    }]
  };

  miniDoughnutOptions: ChartConfiguration['options'] = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    events: [] // Disable all events
  };

  // Update chart when input changes
  ngOnChanges() {
    this.miniDoughnutData.datasets[0].data = [this.progressValue, 100 - this.progressValue];
    this.miniDoughnutData = {...this.miniDoughnutData}; // Trigger change detection
  }


  //2
  @Input() overdueCount = 0;
  @Input() todayCount = 0;

  get totalTickets(): number {
    return this.overdueCount + this.todayCount;
  }

  get overduePercentage(): number {
    return this.totalTickets > 0 ? (this.overdueCount / this.totalTickets) * 100 : 0;
  }

  get todayPercentage(): number {
    return this.totalTickets > 0 ? (this.todayCount / this.totalTickets) * 100 : 0;
  }
}