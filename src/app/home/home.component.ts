import {Component} from "@angular/core";
import {WeatherService} from "../weather.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
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
  }

  async navigateToDetailsPage() {
    let city = 'toronto';
    await this.router.navigate([`/details/${city}`]);
  }
}
