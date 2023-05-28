import {Component, OnInit} from "@angular/core";
import {WeatherService} from "../weather.service";
import {Router} from "@angular/router";
import {DailyForecast} from "../schemas/dailyForecast";
import {concat, concatMap, Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private weatherService: WeatherService, private router: Router, private _snackBar: MatSnackBar) {
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
        this.locationKey = "";
        this.cityName = locName;
        this.weather = response;
        this.isLoading = false;
      }
    });
  }

  async navigateToDetailsPage() {
    const queryParams = {cityName: this.cityName, lat: this.lat, long: this.long};
    console.log(queryParams);
    await this.router.navigate([`/details`], {queryParams});
  }

  searchLocation() {
    console.log(this.locationKey);
    this.isLoading = true;
    this.weatherService.searchLocation(this.locationKey).subscribe({
      next: data => {
        this.renderWeatherData(data.latitude, data.longitude, data.name, data.timezone);
      },
      error: err => {
        this.locationKey = "";
        this.openSnackBar("No result found. Please try another place.");
        this.isLoading = false;
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 1000
    });
  }
}
