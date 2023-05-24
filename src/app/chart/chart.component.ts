import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {Chart, registerables} from "chart.js";
import {nanoid} from "nanoid";

Chart.register(...registerables);

export interface ChartParams {
  color: string;
  labels: string[];
  label: string;
  data: number[];
}

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"]
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() params!: ChartParams;
  chartId = 'chart' + nanoid();

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    new Chart(this.chartId, {
      type: "line",
      data: {
        labels: this.params.labels,
        datasets: [{
          label: this.params.label,
          data: this.params.data,
          fill: false,
          borderColor: this.params.color,
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
}
