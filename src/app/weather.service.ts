import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DailyForecast} from "./schemas/dailyForecast";
import camelcaseKeys from "camelcase-keys";
import {map} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  apiPrefix = 'https://api.open-meteo.com/v1';

  constructor(private http: HttpClient) {
  }

  getDailyData(lat: number, long: number) {
    this.http.get(`${this.apiPrefix}/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,rain_sum&forecast_days=1&timezone=America%2FNew_York`)
      .pipe(
        map(response => this.adapt(response))
      )
      .subscribe({
        next: (response) => {
          console.log(response); // Handle the response from the API
        },
        error: (error) => {
          console.error(error); // Handle any error that occurred during the API request
        }
      });
  }

  getHourlyData(lat: number, long: number) {
    this.http.get(`${this.apiPrefix}/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,rain,pressure_msl,surface_pressure,visibility,windspeed_10m&current_weather=true&forecast_days=1&timezone=America%2FNew_York`)
      .pipe(
        map(response => this.adapt(response))
      )
      .subscribe({
        next: (response) => {
          console.log(response); // Handle the response from the API
        },
        error: (error) => {
          console.error(error); // Handle any error that occurred during the API request
        }
      });
  }



  private adapt(response: any) {
    return camelcaseKeys(response, {deep: true});
  }
}
