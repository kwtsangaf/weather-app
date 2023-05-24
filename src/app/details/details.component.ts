import {Component, OnInit} from "@angular/core";
import {WeatherService} from "../weather.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ChartParams} from "../chart/chart.component";
import {HourlyForecast} from "../schemas/hourlyForecast";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  weather!: HourlyForecast;
  cityName: string = "";
  temperature?: number;
  rain?: number;

  chartParams?: ChartParams;

  constructor(private weatherService: WeatherService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    // Simulating data retrieval from a weather service
    this.cityName = "New York";
    this.temperature = 24;
    this.rain = 30;

    this.route.params.subscribe(params => {
      console.log(params);
      this.cityName = params["city"];


      this.weatherService.getHourlyData(52.52, 13.41).subscribe({
        next: (response) => {
          this.weather = response;
        }
      });
    });

    this.chartParams = {
      labels: ["J", "F", "M", "A", "M", "J", "J"],
      data: [65, 59, 80, 81, 56, 55, 40],
      label: "My First Dataset",
    };
  }

  async navigateToHomePage() {
    await this.router.navigate([`/home`]);
  }

}
