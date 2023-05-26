import {Component, OnInit} from "@angular/core";
import {WeatherService} from "../weather.service";
import {Router} from "@angular/router";
import {DailyForecast} from "../schemas/dailyForecast";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  weather!: DailyForecast;
  cityName: string = "";
  temperature?: number;
  rain?: number;

  constructor(private weatherService: WeatherService, private router: Router) {
  }

  ngOnInit() {
    // Simulating data retrieval from a weather service
    this.cityName = "New York";
    this.temperature = 24;
    this.rain = 30;

    this.weatherService.getDailyData(52.52, 13.41).subscribe({
      next: (response) => {
        this.weather = response;
      }
    });
  }

  async navigateToDetailsPage() {
    let city = "toronto";
    await this.router.navigate([`/details/${city}`]);
  }
}
