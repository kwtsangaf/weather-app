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

  date = new Date();
  timezone = "America/New_York";

  // chartParams?: ChartParams;

  chartParams: ChartParams[] = [];

  constructor(private weatherService: WeatherService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    // Simulating data retrieval from a weather service
    this.temperature = 24;
    this.rain = 30;

    this.route.queryParamMap.subscribe(params => {
      console.log(params);
      const lat = params.get("lat");
      const long = params.get("long");
      this.cityName = params.get("cityName") as string;
      if (lat === null || long === null) {
        // TODO: display error message
      } else {
        this.fetchData(+lat, +long);
      }
    });
  }

  fetchData(lat: number, long: number) {
    this.weatherService.getHourlyData(lat, long).subscribe({
      next: (response) => {
        this.weather = response;
        this.renderCharts();
      }
    });
  }

  renderCharts() {
    let time = this.weather.hourly.time.map(t => t.split("T")[1]);
    this.chartParams.push({
      labels: time,
      data: this.weather.hourly.temperature2M,
      label: "Hourly Temperature",
      color: "#f1c40f"
    });

    this.chartParams.push({
      labels: time,
      data: this.weather.hourly.visibility,
      label: "Hourly Visibility",
      color: "#3498db"
    });

    this.chartParams.push({
      labels: time,
      data: this.weather.hourly.pressureMsl,
      label: "Hourly Pressure",
      color: "#95a5a6"
    });

    this.chartParams.push({
      labels: time,
      data: this.weather.hourly.windspeed10M,
      label: "Hourly Wind Speed",
      color: "#1abc9c"
    });

    this.chartParams.push({
      labels: time,
      data: this.weather.hourly.relativehumidity2M,
      label: "Hourly Humidity",
      color: "#3498db"
    });
  }

  async navigateToHomePage() {
    await this.router.navigate([`/home`]);
  }

}
