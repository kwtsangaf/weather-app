import {Component, OnInit} from "@angular/core";
import {WeatherService} from "../weather.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
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

    // this.weatherService.getDailyData(52.52, 13.41);
    this.weatherService.getHourlyData(52.52, 13.41);
  }

  async navigateToDetailsPage() {
    let city = "toronto";
    await this.router.navigate([`/details/${city}`]);
  }
}
