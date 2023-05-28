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
  cityName?: string;
  lat?: number;
  long?: number;

  locSubject = new Subject<Coordinate>();
  locationKey: string = "";
  isLoading = true;

  constructor(private weatherService: WeatherService, private router: Router) {
  }

  ngOnInit() {
    this.locSubject.subscribe(({latitude, longitude}) => {
      this.lat = latitude;
      this.long = longitude;

      this.renderWeatherData(latitude, longitude);
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

  renderWeatherData(latitude: number, longitude: number, locName = "Current Location", timezone?: string) {
    this.isLoading = true;
    this.weatherService.getDailyData(latitude, longitude, timezone).subscribe({
      next: (response) => {
        this.locationKey = '';
        this.cityName = locName;
        this.weather = response;
        this.isLoading = false;
      }
    });
  }

  async navigateToDetailsPage() {
    const queryParams = {cityName: this.cityName, lat: this.lat, long: this.long};
    console.log(queryParams);
    // TODO: pass timeszone as well
    await this.router.navigate([`/details`], {queryParams});
  }

  searchLocation() {
    console.log(this.locationKey);
    this.isLoading = true;
    this.weatherService.searchLocation(this.locationKey).subscribe(data => {

      // TODO: if the result is valid
      this.renderWeatherData(data.latitude, data.longitude, data.name, data.timezone);
    });
  }
}
