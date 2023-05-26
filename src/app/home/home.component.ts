import {Component, OnInit} from "@angular/core";
import {WeatherService} from "../weather.service";
import {Router} from "@angular/router";
import {DailyForecast} from "../schemas/dailyForecast";
import {Subject} from "rxjs";

interface Coordinate {
  latitude: number;
  longitude: number;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  weather!: DailyForecast;
  cityName: string = "Current Location";
  lat?: number;
  long?: number;

  locSubject = new Subject<Coordinate>();

  constructor(private weatherService: WeatherService, private router: Router) {
  }

  ngOnInit() {
    this.locSubject.subscribe(({latitude, longitude}) => {
      this.lat = latitude;
      this.long = longitude;
      this.weatherService.getDailyData(latitude, longitude).subscribe({
        next: (response) => {
          this.weather = response;
        }
      });
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => this.locSubject.next(position.coords),
        (error) => console.log("Error retrieving location:", error.message)
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

  }

  async navigateToDetailsPage() {
    const queryParams = {cityName: this.cityName, lat: this.lat, long: this.long};
    console.log(queryParams)
    await this.router.navigate([`/details`], {queryParams});
  }
}
